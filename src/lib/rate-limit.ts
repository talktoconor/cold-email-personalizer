/**
 * Simple in-memory sliding window rate limiter.
 * For production with multiple instances, replace with Upstash Redis.
 */

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/** Rate limits per plan: [requests, windowMs] */
const PLAN_RATE_LIMITS: Record<string, { limit: number; windowMs: number }> = {
  free: { limit: 2, windowMs: 60_000 },
  pro: { limit: 10, windowMs: 60_000 },
  team: { limit: 30, windowMs: 60_000 },
  agency: { limit: 60, windowMs: 60_000 },
  anonymous: { limit: 1, windowMs: 60_000 },
};

/**
 * Check and consume a rate limit token for the given key.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  // No existing entry or window has expired — start fresh
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return {
      allowed: true,
      remaining: limit - 1,
      resetAt: now + windowMs,
    };
  }

  // Within the current window
  if (entry.count < limit) {
    entry.count++;
    return {
      allowed: true,
      remaining: limit - entry.count,
      resetAt: entry.resetTime,
    };
  }

  // Over limit
  return {
    allowed: false,
    remaining: 0,
    resetAt: entry.resetTime,
  };
}

/**
 * Get rate limit config for a plan.
 */
export function getRateLimitForPlan(plan: string): {
  limit: number;
  windowMs: number;
} {
  return PLAN_RATE_LIMITS[plan] ?? PLAN_RATE_LIMITS.anonymous;
}

// --- Demo rate limiting (per-IP daily limit) ---

const demoLimitMap = new Map<
  string,
  { count: number; resetTime: number }
>();

const DEMO_DAILY_LIMIT = 3;

/**
 * Check and consume a demo generation token for the given IP.
 * Allows max DEMO_DAILY_LIMIT generations per IP per day.
 */
export function checkDemoLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const entry = demoLimitMap.get(ip);

  // Calculate milliseconds until midnight
  const tomorrow = new Date();
  tomorrow.setHours(24, 0, 0, 0);
  const msUntilMidnight = tomorrow.getTime() - now;

  if (!entry || now > entry.resetTime) {
    demoLimitMap.set(ip, {
      count: 1,
      resetTime: now + msUntilMidnight,
    });
    return {
      allowed: true,
      remaining: DEMO_DAILY_LIMIT - 1,
      resetAt: now + msUntilMidnight,
    };
  }

  if (entry.count < DEMO_DAILY_LIMIT) {
    entry.count++;
    return {
      allowed: true,
      remaining: DEMO_DAILY_LIMIT - entry.count,
      resetAt: entry.resetTime,
    };
  }

  return {
    allowed: false,
    remaining: 0,
    resetAt: entry.resetTime,
  };
}

// Clean up expired entries periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap) {
      if (now > value.resetTime) rateLimitMap.delete(key);
    }
    for (const [key, value] of demoLimitMap) {
      if (now > value.resetTime) demoLimitMap.delete(key);
    }
  }, 60_000);
}
