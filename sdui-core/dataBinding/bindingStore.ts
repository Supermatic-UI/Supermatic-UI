export type SubscriptionHandler = () => void;

export type BindingStore = {
  createMainProxy: (obj: any) => any;
  subscribe: (path: string, callback: SubscriptionHandler) => void;
};

const combinePath = (path: string, key: string): string => (path === '' ? key : `${path}.${key}`);

export const createBindingStore = (): BindingStore => {
  let mainProxy: any;
  const childProxyStore: Record<string, any> = {};
  const subscriptions: Record<string, SubscriptionHandler[]> = {};

  const proxyFabric = (object: any, path: string): any => {
    const proxy = new Proxy(object, {
      set: (target, key, newValue) => handleProxySet(path, target, String(key), newValue)
    });
    console.log(`[bind-store] create proxy for '${path}'`);

    return proxy;
  };

  const createChildProxy = (path: string, target: any, key: string, newValue: any): void => {
    const combinedPath = combinePath(path, key);
    console.log(`[bind-store] create child proxy for ${combinedPath}`);
    const childProxy = proxyFabric(newValue, combinedPath);

    if (!subscriptions[combinedPath]) {
      subscriptions[combinedPath] = [];
    }

    childProxyStore[combinedPath] = childProxy;

    // Replace chile property with proxy to enable change trackinf of deep objects
    target[key] = childProxy;
  };

  const handleProxySet = (path: string, target: any, key: string, newValue: any): boolean => {
    // Handle set
    const combinedPath = combinePath(path, key);
    console.log(`[bind-store] handle proxy set for '${combinedPath}'`);

    if (typeof newValue === 'object') {
      if (childProxyStore[combinedPath] != null) {
        // TODO: Check proxy replacement
      } else {
        // Create new proxy for child item and store
        createChildProxy(path, target, key, newValue);
      }
    } else {
      target[key] = newValue;
    }

    return notifyChangeEvent(combinedPath);
  };

  const notifyChangeEvent = (path: string): boolean => {
    console.log(`[bind-store] notify change event with ${path}`);
    const subscribers = subscriptions[path];
    if (subscribers != null) {
      for (let i = 0; i < subscribers.length; i++) {
        const subscriber = subscribers[i];
        try {
          // notify change
          console.log(`[bind-store] notify change event with ${path}. Call subscriber #${i}`);
          subscriber();
        } catch (error) {
          console.error(error);
          return false;
        }
      }
    }
    return true;
  };

  const findSubscriptionPath = (path): string => {
    const pathParts = path.split('.');
    let currentPath = '';
    let found: string | undefined;
    for (let i = 0; i < pathParts.length; i++) {
      const pathPart = pathParts[i];
      currentPath = combinePath(currentPath, pathPart);
      if (subscriptions[currentPath]) {
        found = currentPath;
      }
    }
    return currentPath || path;
  };

  return {
    createMainProxy: (obj) => {
      mainProxy = proxyFabric(obj, '');
      return mainProxy;
    },
    subscribe: (path, callback) => {
      const subscriptionPath = findSubscriptionPath(path);
      console.log(`[bind-store] subscribe to change event with ${subscriptionPath} (original path: ${path})`);
      if (!subscriptions[subscriptionPath]) {
        subscriptions[subscriptionPath] = [];
      }
      subscriptions[subscriptionPath].push(callback);
    }
  };
};
