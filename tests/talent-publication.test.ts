import { describe, expect, it } from 'vitest';
import { blankTalent, validatePublication, validateMedia, talentSchema } from '../src/features/talents/model';

describe('Talent publication', () => {
  const values = { ...blankTalent, name: 'Amina', categories: ['Artisanat'] as ['Artisanat'] };
  it('accepts an audio presentation without a written bio', () => {
    expect(validatePublication(values, true).bio).toBe('');
  });
  it('requires bio or audio before publication', () => {
    expect(() => validatePublication(values, false)).toThrow();
    expect(validatePublication({ ...values, bio: 'Je transmets la couture.' }, false).bio).toBe('Je transmets la couture.');
  });
  it('requires at least one catalog category', () => {
    expect(talentSchema.safeParse({ ...values, categories: [] }).success).toBe(false);
    expect(talentSchema.safeParse({ ...values, categories: ['Inventée'] }).success).toBe(false);
  });
  it('rejects videos from talent media', () => {
    expect(() => validateMedia({ type: 'video/mp4', size: 1000 }, 'audio')).toThrow();
    expect(() => validateMedia({ type: 'video/mp4', size: 1000 }, 'photo')).toThrow();
  });
  it('rejects executable links', () => {
    expect(talentSchema.safeParse({ ...values, links: ['javascript:alert(1)'] }).success).toBe(false);
    expect(talentSchema.safeParse({ ...values, links: ['https://example.org'] }).success).toBe(true);
  });
  it('accepts recorded audio mime parameters', () => {
    expect(() => validateMedia({ type: 'audio/webm;codecs=opus', size: 1000 }, 'audio')).not.toThrow();
  });
});