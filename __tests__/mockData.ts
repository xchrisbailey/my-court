import { Brand, Racket, RacketWithBrand, String, StringWithBrand, User } from '@/shared/types';

export const mockUser: User = {
    id: 'user123',
    email: 'test@example.com',
    password: 'hashedpassword',
};

export const mockBrand: Brand = {
    id: 'brand123',
    name: 'Test Brand',
    about: 'This is a test brand',
    logoLink: 'https://example.com/logo.png',
    createdAt: new Date('2023-01-01'),
};

export const mockRacket: Racket = {
    id: 'racket123',
    model: 'Test Racket',
    headSize: 100,
    year: 2023,
    stringPattern: '16x19',
    weight: 300,
    swingWeight: 320,
    createdAt: new Date('2023-01-01'),
    brandId: 'brand123',
};

export const mockRacketWithBrand: RacketWithBrand = {
    id: 'racket123',
    model: 'Test Racket',
    headSize: 100,
    year: 2023,
    stringPattern: '16x19',
    weight: 300,
    swingWeight: 320,
    createdAt: new Date('2023-01-01'),
    brand: mockBrand,
    brandId: 'brand123',
};

export const mockString: String = {
    id: 'string123',
    model: 'Test String',
    gauge: '1.25mm',
    composition: 'Polyester',
    createdAt: new Date('2023-01-01'),
    brandId: 'brand123',
};

export const mockStringWithBrand: StringWithBrand = {
    id: 'string123',
    model: 'Test String',
    gauge: '1.25mm',
    composition: 'Polyester',
    createdAt: new Date('2023-01-01'),
    brand: mockBrand,
    brandId: 'brand123',
};
