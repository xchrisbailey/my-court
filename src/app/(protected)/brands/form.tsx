'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brand } from '@/shared/types';
import { use, useActionState } from 'react';
import { addBrand, BrandActionState, editBrand } from './actions';

type Props = {
  page: 'new' | 'edit';
  targetBrandPromise?: Promise<Brand | undefined>;
};

export function BrandForm({ page, targetBrandPromise }: Props) {
  const brand = targetBrandPromise ? use(targetBrandPromise) : undefined;
  const [state, action, pending] = useActionState<BrandActionState, FormData>(
    page === 'new' ? addBrand : editBrand,
    {
      error: '',
    },
  );

  return (
    <>
      <h1>{page === 'new' ? 'Add Brand' : `Edit ${brand?.name}`}</h1>
      <form action={action} className="space-y-5">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            type="text"
            placeholder="enter brand name"
            required
            defaultValue={page === 'edit' ? brand?.name : ''}
          />

          {state.errors?.name && <p>{state.errors.name[0]}</p>}
        </div>
        <div>
          <Label htmlFor="logoLink">Logo Link</Label>
          <Input
            name="logoLink"
            type="text"
            placeholder="Enter brand image url"
            required
            defaultValue={page === 'edit' ? brand?.logoLink : ''}
          />

          {state.errors?.logoLink && <p>{state.errors.logoLink[0]}</p>}
        </div>
        <div>
          <Label htmlFor="about">About</Label>
          <Input
            name="about"
            type="text"
            placeholder="short blub about this company"
            required
            defaultValue={page === 'edit' ? brand?.about : ''}
          />

          {state.errors?.about && <p>{state.errors.about[0]}</p>}
        </div>

        {page === 'edit' ? (
          <input type="hidden" value={brand?.id} name="brandId" />
        ) : null}
        <Button disabled={pending}>
          {pending ? 'loading...' : page === 'new' ? 'add' : 'edit'}
        </Button>
      </form>
    </>
  );
}
