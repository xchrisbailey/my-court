import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { db } from '.';
import * as queries from './queries';

vi.mock('./schema', () => ({
  brands: {},
  gearSets: {},
  matches: {},
  practices: {},
  rackets: {},
  strings: {},
}));

vi.mock('.', () => ({
  db: {
    query: {
      brands: {
        findFirst: vi.fn(),
        findMany: vi.fn(),
      },
      rackets: {
        findFirst: vi.fn(),
        findMany: vi.fn(),
      },
      strings: {
        findFirst: vi.fn(),
        findMany: vi.fn(),
      },
      gearSets: {
        findFirst: vi.fn(),
        findMany: vi.fn(),
      },
      matches: {
        findFirst: vi.fn(),
        findMany: vi.fn(),
      },
      practices: {
        findFirst: vi.fn(),
        findMany: vi.fn(),
      },
    },
  },
}));

describe('Database Queries', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get a brand by id', async () => {
    const mockBrand = { id: '1', name: 'Brand A' };
    (db.query.brands.findFirst as Mock).mockResolvedValue(mockBrand);

    const result = await queries.getBrand('1');
    expect(result).toEqual(mockBrand);
    expect(db.query.brands.findFirst).toHaveBeenCalledWith({
      where: expect.objectContaining({
        queryChunks: expect.arrayContaining([
          expect.objectContaining({ value: expect.arrayContaining(['']) }),
          undefined,
          expect.objectContaining({ value: expect.arrayContaining([' = ']) }),
          '1',
          expect.objectContaining({ value: expect.arrayContaining(['']) }),
        ]),
      }),
    });
  });

  it('should get all brands', async () => {
    const mockBrands = [
      { id: '1', name: 'Brand A' },
      { id: '2', name: 'Brand B' },
    ];
    (db.query.brands.findMany as Mock).mockResolvedValue(mockBrands);

    const result = await queries.getBrands();
    expect(result).toEqual(mockBrands);
    expect(db.query.brands.findMany).toHaveBeenCalled();
  });

  it('should get a racket by id', async () => {
    const mockRacket = { id: '1', name: 'Racket A' };
    (db.query.rackets.findFirst as Mock).mockResolvedValue(mockRacket);

    const result = await queries.getRacket('1');
    expect(result).toEqual(mockRacket);
    expect(db.query.rackets.findFirst).toHaveBeenCalledWith({
      where: expect.objectContaining({
        queryChunks: expect.arrayContaining([
          expect.objectContaining({ value: expect.arrayContaining(['']) }),
          undefined,
          expect.objectContaining({ value: expect.arrayContaining([' = ']) }),
          '1',
          expect.objectContaining({ value: expect.arrayContaining(['']) }),
        ]),
      }),
    });
  });

  it('should get all rackets', async () => {
    const mockRackets = [
      { id: '1', name: 'Racket A' },
      { id: '2', name: 'Racket B' },
    ];
    (db.query.rackets.findMany as Mock).mockResolvedValue(mockRackets);

    const result = await queries.getRackets();
    expect(result).toEqual(mockRackets);
    expect(db.query.rackets.findMany).toHaveBeenCalled();
  });

  it('should get a string by id', async () => {
    const mockString = { id: '1', name: 'String A' };
    (db.query.strings.findFirst as Mock).mockResolvedValue(mockString);

    const result = await queries.getString('1');
    expect(result).toEqual(mockString);
    expect(db.query.strings.findFirst).toHaveBeenCalledWith({
      where: expect.objectContaining({
        queryChunks: expect.arrayContaining([
          expect.objectContaining({ value: expect.arrayContaining(['']) }),
          undefined,
          expect.objectContaining({ value: expect.arrayContaining([' = ']) }),
          '1',
          expect.objectContaining({ value: expect.arrayContaining(['']) }),
        ]),
      }),
    });
  });

  it('should get all strings', async () => {
    const mockStrings = [
      { id: '1', name: 'String A' },
      { id: '2', name: 'String B' },
    ];
    (db.query.strings.findMany as Mock).mockResolvedValue(mockStrings);

    const result = await queries.getStrings();
    expect(result).toEqual(mockStrings);
    expect(db.query.strings.findMany).toHaveBeenCalled();
  });

  it('should get a gear set with items by id and user id', async () => {
    const mockGearSet = { id: '1', userId: 'user1', strings: [], racket: {} };
    (db.query.gearSets.findFirst as Mock).mockResolvedValue(mockGearSet);

    const result = await queries.getGearSetWithItems('1', 'user1');
    expect(result).toEqual(mockGearSet);
    expect(db.query.gearSets.findFirst).toHaveBeenCalled();
  });

  it('should get all gear sets with items by user id', async () => {
    const mockGearSets = [
      { id: '1', userId: 'user1', strings: [], racket: {} },
    ];
    (db.query.gearSets.findMany as Mock).mockResolvedValue(mockGearSets);

    const result = await queries.getGearSetsWithItems('user1');
    expect(result).toEqual(mockGearSets);
    expect(db.query.gearSets.findMany).toHaveBeenCalled();
  });

  it('should get a match with relations by id and user id', async () => {
    const mockMatch = {
      id: '1',
      userId: 'user1',
      user: {},
      gear: { racket: {}, strings: [] },
    };
    (db.query.matches.findFirst as Mock).mockResolvedValue(mockMatch);

    const result = await queries.getMatchWithRelations('1', 'user1');
    expect(result).toEqual(mockMatch);
    expect(db.query.matches.findFirst).toHaveBeenCalled();
  });

  it('should get all matches by user id', async () => {
    const mockMatches = [{ id: '1', userId: 'user1' }];
    (db.query.matches.findMany as Mock).mockResolvedValue(mockMatches);

    const result = await queries.getMatches('user1');
    expect(result).toEqual(mockMatches);
    expect(db.query.matches.findMany).toHaveBeenCalled();
  });

  it('should get a practice with relations by id and user id', async () => {
    const mockPractice = {
      id: '1',
      userId: 'user1',
      user: {},
      gear: { racket: {}, strings: [] },
    };
    (db.query.practices.findFirst as Mock).mockResolvedValue(mockPractice);

    const result = await queries.getPracticeWithRelations('1', 'user1');
    expect(result).toEqual(mockPractice);
    expect(db.query.practices.findFirst).toHaveBeenCalled();
  });

  it('should get all practices by user id', async () => {
    const mockPractices = [{ id: '1', userId: 'user1' }];
    (db.query.practices.findMany as Mock).mockResolvedValue(mockPractices);

    const result = await queries.getPractices('user1');
    expect(result).toEqual(mockPractices);
    expect(db.query.practices.findMany).toHaveBeenCalled();
  });
});
