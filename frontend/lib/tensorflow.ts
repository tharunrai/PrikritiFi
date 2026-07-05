import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

let model: mobilenet.MobileNet | null = null;

export const loadModel = async () => {
  if (!model) {
    await tf.ready();
    model = await mobilenet.load({ version: 2, alpha: 1.0 });
  }
  return model;
};

export const analyzeImage = async (imgElement: HTMLImageElement) => {
  const m = await loadModel();
  const predictions = await m.classify(imgElement, 3);
  
  // Checking if the top prediction is related to plants/nature
  const plantKeywords = ['plant', 'flower', 'tree', 'grass', 'leaf', 'pot', 'agriculture', 'crop', 'field', 'earth', 'daisy', 'rose', 'vine'];
  
  let isHealthy = false;
  let confidence = 0;

  for (const p of predictions) {
    const className = p.className.toLowerCase();
    const isPlant = plantKeywords.some(kw => className.includes(kw));
    
    if (isPlant && p.probability > 0.4) {
      isHealthy = true;
      confidence = p.probability;
      break;
    }
  }

  // If no plant detected with good confidence, mock it as stressed/unhealthy for demo purposes
  if (!isHealthy) {
    return {
      status: 'Stressed' as const,
      confidence: predictions[0].probability,
    };
  }

  return {
    status: 'Healthy' as const,
    confidence: confidence,
  };
};
