type LogLevel = 'info' | 'warn' | 'error';

interface LogParams {
  level: LogLevel;
  module: string;
  functionName: string;
  message: string;
  metadata?: Record<string, unknown>;
}

export function logEvent({ level, module, functionName, message, metadata }: LogParams) {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    module,
    function: functionName,
    message,
    ...(metadata ? { metadata } : {}),
  };

  const serialized = JSON.stringify(payload);

  switch (level) {
    case 'error':
      console.error(serialized);
      break;
    case 'warn':
      console.warn(serialized);
      break;
    default:
      console.log(serialized);
  }
}

