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
import { Brand, String } from '@/shared/types';
import { use, useActionState } from 'react';
import { addString, editString, StringActionState } from '../actions';

type Props = {
  page: 'new' | 'edit';
  targetStringPromise?: Promise<String | undefined>;
  brandsPromise: Promise<Brand[]>;
};

const stringGauges = ['16', '16L', '17', '18'];
const stringComposition = [
  'polyester',
  'multifilament',
  'natural gut',
  'synthetic gut',
  'hybrid',
];

export function StringForm({
  page,
  targetStringPromise,
  brandsPromise,
}: Props) {
  const stringData = targetStringPromise ? use(targetStringPromise) : undefined;
  const brands = use(brandsPromise);
  const [state, action, pending] = useActionState<StringActionState, FormData>(
    page === 'new' ? addString : editString,
    {
      error: '',
    },
  );

  return (
    <>
      <h1>{page === 'new' ? 'Add String' : `Edit ${stringData?.model}`}</h1>
      <form action={action} className="space-y-5">
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <Label htmlFor="model">Model</Label>
            <Input
              name="model"
              type="text"
              placeholder="enter model"
              required
              defaultValue={page === 'edit' ? stringData?.model : ''}
            />

            {state.errors?.model && <FieldError msg={state.errors.model[0]} />}
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <Label htmlFor="gauge">Gauge</Label>
              <Select
                name="gauge"
                defaultValue={page === 'edit' ? stringData?.gauge : ''}
              >
                <SelectTrigger className="w-full" aria-label="Select Gauge">
                  <SelectValue placeholder="Select Gauge" />
                </SelectTrigger>
                <SelectContent>
                  {stringGauges.map(gauge => (
                    <SelectItem value={gauge} key={gauge}>
                      {gauge}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.gauge && (
                <FieldError msg={state.errors.gauge[0]} />
              )}
            </div>

            <div className="w-full">
              <Label htmlFor="composition">Composition</Label>
              <Select
                name="composition"
                defaultValue={page === 'edit' ? stringData?.composition : ''}
              >
                <SelectTrigger
                  className="w-full"
                  aria-label="Select String Material"
                >
                  <SelectValue placeholder="Select String Material" />
                </SelectTrigger>
                <SelectContent>
                  {stringComposition.map(comp => (
                    <SelectItem value={comp} key={comp}>
                      {comp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.composition && (
                <FieldError msg={state.errors.composition[0]} />
              )}
            </div>
          </div>

          <div className="w-full">
            <Label htmlFor="brandId">Brand</Label>
            <Select
              name="brandId"
              defaultValue={page === 'edit' ? stringData?.brandId : ''}
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

        {page === 'edit' ? (
          <input type="hidden" value={stringData?.id} name="stringId" />
        ) : null}
        <Button disabled={pending}>
          {pending ? 'loading...' : page === 'new' ? 'add' : 'edit'}
        </Button>
      </form>
    </>
  );
}
