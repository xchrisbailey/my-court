import {
  Brand,
  GearSetWithRacketAndString,
  Practice,
  PracticeWithRelations,
  Racket,
  RacketWithBrand,
  String,
  StringWithBrand,
  User,
} from '@/shared/types';
import { faker } from '@faker-js/faker';
import { createId } from '@paralleldrive/cuid2';

export const generateRandomUser = (): User => ({
  id: createId(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const generateRandomBrand = (): Brand => ({
  id: createId(),
  name: faker.company.name(),
  about: faker.lorem.sentence(),
  logoLink: faker.image.dataUri(),
  createdAt: faker.date.past(),
});

export const generateRandomRacket = (): Racket => ({
  id: createId(),
  model: faker.commerce.productName(),
  headSize: faker.number.int({ min: 85, max: 110 }),
  year: faker.date.past().getFullYear(),
  stringPattern: `${faker.number.int({ min: 16, max: 18 })}x${faker.number.int({ min: 16, max: 20 })}`,
  weight: faker.number.int({ min: 250, max: 350 }),
  swingWeight: faker.number.int({ min: 280, max: 350 }),
  createdAt: faker.date.past(),
  brandId: createId(),
});

export const generateRandomRacketWithBrand = (): RacketWithBrand => {
  const brand = generateRandomBrand();
  return {
    ...generateRandomRacket(),
    brand,
    brandId: brand.id,
  };
};

export const generateRandomString = (): String => ({
  id: createId(),
  model: faker.commerce.productName(),
  gauge: `${faker.number.float({ min: 1.1, max: 1.4, fractionDigits: 2 })}mm`,
  composition: faker.commerce.productMaterial(),
  createdAt: faker.date.past(),
  brandId: createId(),
});

export const generateRandomStringWithBrand = (): StringWithBrand => {
  const brand = generateRandomBrand();
  return {
    ...generateRandomString(),
    brand,
    brandId: brand.id,
  };
};

export const generateRandomGearSetWithRacketAndString =
  (): GearSetWithRacketAndString => {
    const racket = generateRandomRacketWithBrand();
    const string = generateRandomStringWithBrand();
    return {
      id: createId(),
      userId: createId(),
      racketId: racket.id,
      createdAt: faker.date.past(),
      stringId: string.id,
      stringTensionMains: faker.number.int({ min: 40, max: 70 }),
      stringTensionCrosses: faker.number.int({ min: 40, max: 70 }),
      racket,
      strings: string,
    };
  };

export const generateRandomPractice = (): Practice => {
  const user = generateRandomUser();
  const gear = generateRandomGearSetWithRacketAndString();
  return {
    id: createId(),
    userId: user.id,
    createdAt: faker.date.past(),
    location: faker.location.city(),
    city: faker.location.city(),
    state: faker.location.state(),
    type: faker.helpers.arrayElement([
      'drill',
      'singles',
      'doubles',
      'friendly hit',
      'paid hit',
      'private lesson',
    ]),
    playDate: faker.date.future().toISOString(),
    notes: faker.lorem.sentence(),
    gearId: gear.id,
  };
};

export const generateRandomPracticeWithUserAndGear =
  (): PracticeWithRelations => {
    const user = generateRandomUser();
    const gear = generateRandomGearSetWithRacketAndString();
    return {
      id: createId(),
      userId: user.id,
      createdAt: faker.date.past(),
      location: faker.location.city(),
      city: faker.location.city(),
      state: faker.location.state(),
      type: faker.helpers.arrayElement([
        'drill',
        'singles',
        'doubles',
        'friendly hit',
        'paid hit',
        'private lesson',
      ]),
      playDate: faker.date.future().toISOString(),
      notes: faker.lorem.sentence(),
      gearId: gear.id,
      gear,
      user,
    };
  };

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
