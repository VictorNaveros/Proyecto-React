// src/components/common/NotificationContainer.jsx

import { useNotification } from '../../hooks/useNotification';
import { Card, CardBody, Button } from '@nextui-org/react';

function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  // Mapeo de tipos a colores y emojis
  const typeConfig = {
    success: {
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      emoji: '✅'
    },
    error: {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      emoji: '❌'
    },
    warning: {
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      emoji: '⚠️'
    },
    info: {
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      emoji: 'ℹ️'
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {notifications.map((notification) => {
        const config = typeConfig[notification.type] || typeConfig.info;
        
        return (
          <Card
            key={notification.id}
            className={`${config.bgColor} ${config.borderColor} border-2 shadow-lg animate-in slide-in-from-right`}
          >
            <CardBody className="flex flex-row items-center gap-3 p-4">
              {/* Emoji */}
              <span className="text-2xl">{config.emoji}</span>
              
              {/* Mensaje */}
              <div className="flex-1">
                <p className={`text-sm font-medium ${config.textColor}`}>
                  {notification.message}
                </p>
              </div>
              
              {/* Botón cerrar */}
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => removeNotification(notification.id)}
                className="min-w-unit-6 w-6 h-6"
              >
                ✕
              </Button>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}

export default NotificationContainer;