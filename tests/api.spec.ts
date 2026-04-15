import { test, expect } from '@playwright/test';

test.describe('API Endpoints', () => {
  test('should return services data', async ({ request }) => {
    const response = await request.get('/api/public/data');
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.services).toBeDefined();
    expect(Array.isArray(data.services)).toBeTruthy();
    expect(data.services.length).toBeGreaterThan(0);
  });

  test('should return pricing data', async ({ request }) => {
    const response = await request.get('/api/public/data');
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.pricing).toBeDefined();
    expect(Array.isArray(data.pricing)).toBeTruthy();
    expect(data.pricing.length).toBeGreaterThan(0);
  });

  test('should return team data', async ({ request }) => {
    const response = await request.get('/api/public/data');
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.team).toBeDefined();
    expect(Array.isArray(data.team)).toBeTruthy();
  });

  test('should return testimonials data', async ({ request }) => {
    const response = await request.get('/api/public/data');
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.testimonials).toBeDefined();
    expect(Array.isArray(data.testimonials)).toBeTruthy();
  });

  test('should return company data', async ({ request }) => {
    const response = await request.get('/api/public/data');
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.company).toBeDefined();
    expect(Array.isArray(data.company)).toBeTruthy();
  });
});
