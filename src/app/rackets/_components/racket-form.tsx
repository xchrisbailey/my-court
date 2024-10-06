'use client';

import { FieldError } from '@/components/field-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Brand, Racket } from '@/shared/types';
import { use, useActionState } from 'react';
import { addRacket, editRacket, RacketActionState } from '../actions';

type Props = {
  page: 'new' | 'edit';
  targetRacketPromise?: Promise<Racket | undefined>;
  brandsPromise: Promise<Brand[]>;
};

export function RacketForm({
  page,
  targetRacketPromise,
  brandsPromise,
}: Props) {
  const racket = targetRacketPromise ? use(targetRacketPromise) : undefined;
  const brands = use(brandsPromise);
  const [state, action, pending] = useActionState<RacketActionState, FormData>(
    page === 'new' ? addRacket : editRacket,
    {
      error: '',
    },
  );

  return (
    <>
      <h1>{page === 'new' ? 'Add Racket' : `Edit ${racket?.model}`}</h1>
      <form action={action} className="space-y-5">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full">
            <Label htmlFor="model">Model</Label>
            <Input
              name="model"
              type="text"
              placeholder="enter model"
              required
              defaultValue={page === 'edit' ? racket?.model : ''}
            />

            {state.errors?.model && <FieldError msg={state.errors.model[0]} />}
          </div>

          <div className="w-full">
            <Label htmlFor="year">Year</Label>
            <Input
              name="year"
              type="number"
              placeholder="enter year"
              min={1900}
              max={2050}
              step={1}
              required
              defaultValue={page === 'edit' ? racket?.year : ''}
            />

            {state.errors?.year && <FieldError msg={state.errors.year[0]} />}
          </div>

          <div className="w-full">
            <Label htmlFor="brandId">Brand</Label>
            <Select
              name="brandId"
              defaultValue={page === 'edit' ? racket?.brandId : ''}
            >
              <SelectTrigger className="w-full" aria-label="Select Brand">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map(brand => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.errors?.brandId && (
              <FieldError msg={state.errors.brandId[0]} />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="w-full">
            <Label htmlFor="headSize">Head Size</Label>
            <Select
              name="headSize"
              defaultValue={page === 'edit' ? racket?.headSize.toString() : ''}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Select Head Size"
                  defaultValue={page === 'edit' ? racket?.headSize : ''}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="95">95in</SelectItem>
                <SelectItem value="97">97in</SelectItem>
                <SelectItem value="98">98in</SelectItem>
                <SelectItem value="100">100in</SelectItem>
                <SelectItem value="105">105in</SelectItem>
              </SelectContent>
            </Select>

            {state.errors?.headSize && (
              <FieldError msg={state.errors.headSize[0]} />
            )}
          </div>
          <div className="w-full">
            <Label htmlFor="stringPattern">String Pattern</Label>
            <Select
              name="stringPattern"
              defaultValue={page === 'edit' ? racket?.stringPattern : ''}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Select String Pattern"
                  defaultValue={page === 'edit' ? racket?.stringPattern : ''}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="16x18">16x18</SelectItem>
                <SelectItem value="16x19">16x19</SelectItem>
                <SelectItem value="18x20">18x20</SelectItem>
                <SelectItem value="16x20">16x20</SelectItem>
                <SelectItem value="18x19">18x19</SelectItem>
              </SelectContent>
            </Select>
            {state.errors?.stringPattern && (
              <FieldError msg={state.errors.stringPattern[0]} />
            )}
          </div>
          <div className="w-full">
            <Label htmlFor="weight">Racket Weight</Label>
            <Input
              name="weight"
              min={200}
              max={500}
              step={1}
              type="number"
              placeholder="Enter racket weight (grams)"
              required
              defaultValue={page === 'edit' ? racket?.weight : ''}
            />
            {state.errors?.weight && (
              <FieldError msg={state.errors.weight[0]} />
            )}
          </div>
          <div className="w-full">
            <Label htmlFor="swingWeight">Swing Weight</Label>
            <Input
              name="swingWeight"
              min={200}
              max={400}
              step={1}
              type="number"
              placeholder="Enter swing weight (grams)"
              required
              defaultValue={page === 'edit' ? racket?.swingWeight : ''}
            />
            {state.errors?.swingWeight && (
              <FieldError msg={state.errors?.swingWeight[0]} />
            )}
          </div>
        </div>

        {page === 'edit' ? (
          <input type="hidden" value={racket?.id} name="racketId" />
        ) : null}
        <Button disabled={pending}>
          {pending ? 'loading...' : page === 'new' ? 'add' : 'edit'}
        </Button>
      </form>
    </>
  );
}
