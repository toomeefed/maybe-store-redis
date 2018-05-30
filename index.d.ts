interface RetryStrategyOptions {
  error: Error;
  total_retry_time: number;
  times_connected: number;
  attempt: number;
}

type RetryStrategy = (options: RetryStrategyOptions) => number | Error;

interface ClientOpts {
  host?: string;
  port?: number;
  path?: string;
  url?: string;
  parser?: string;
  string_numbers?: boolean;
  return_buffers?: boolean;
  detect_buffers?: boolean;
  socket_keepalive?: boolean;
  no_ready_check?: boolean;
  enable_offline_queue?: boolean;
  retry_max_delay?: number;
  connect_timeout?: number;
  max_attempts?: number;
  retry_unfulfilled_commands?: boolean;
  auth_pass?: string;
  password?: string;
  db?: string | number;
  family?: string;
  rename_commands?: { [command: string]: string } | null;
  tls?: any;
  prefix?: string;
  namespace?: string;
  retry_strategy?: RetryStrategy;
}

declare class MaybeStoreRedis {
  /**
   * @param opts The options object is also passed through to the storage adapter. Check your storage adapter docs for any extra options.
   */
  constructor(opts?: ClientOpts);

  /** Returns the namespace of a key */
  _getNamespace(key: string): string;

  /** Returns the value. */
  get(key: string): Promise<any>;

  /**
   * Set a value.
   *
   * By default keys are persistent. You can set an expiry TTL in milliseconds.
   */
  set(key: string, value: any, ttl?: number): Promise<boolean>;

  /**
   * Deletes an entry.
   *
   * Returns `true` if the key existed, `false` if not.
   */
  delete(key: string): Promise<boolean>;

  /** Delete all entries in the current namespace. */
  clear(): Promise<void>;
}

export = MaybeStoreRedis;
