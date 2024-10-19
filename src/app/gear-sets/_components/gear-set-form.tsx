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
import {
  GearSetWithRelations,
  RacketWithRelations,
  StringWithRelations,
} from '@/shared/types';
import { use, useActionState } from 'react';
import { addGearSet, editGearSet, GearSetActionState } from '../actions';

type Props = {
  page: 'new' | 'edit';
  targetGearSet?: Promise<GearSetWithRelations | undefined>;
  racketsPromise: Promise<RacketWithRelations[]>;
  stringsPromise: Promise<StringWithRelations[]>;
};

export function GearSetForm({
  page,
  racketsPromise,
  stringsPromise,
  targetGearSet,
}: Props) {
  const gearSet = targetGearSet ? use(targetGearSet) : undefined;
  const rackets = use(racketsPromise);
  const strings = use(stringsPromise);
  const [state, action, pending] = useActionState<GearSetActionState, FormData>(
    page === 'new' ? addGearSet : editGearSet,
    {
      error: '',
    },
  );

  return (
    <>
      <h1>{page === 'new' ? 'Create A Gear Set' : `Edit Gear Set`}</h1>
      <form action={action} className="space-y-5">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full">
            <Label htmlFor="racketId">Racket</Label>
            <Select
              name="racketId"
              defaultValue={page === 'edit' ? gearSet?.racketId : ''}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Racket" />
              </SelectTrigger>
              <SelectContent>
                {rackets.map(racket => (
                  <SelectItem key={racket.id} value={racket.id}>
                    {racket.brand.name} {racket.model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.errors?.racketId && (
              <FieldError msg={state.errors.racketId[0]} />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="col-span-2">
            <Label htmlFor="stringId">Strings</Label>
            <Select
              name="stringId"
              defaultValue={page === 'edit' ? gearSet?.stringId : ''}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Strings" />
              </SelectTrigger>
              <SelectContent>
                {strings.map(string => (
                  <SelectItem key={string.id} value={string.id}>
                    {string.brand.name} {string.model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.errors?.stringId && (
              <FieldError msg={state.errors.stringId[0]} />
            )}
          </div>
          <div>
            <Label htmlFor="stringTensionMains">Tension Mains</Label>
            <Input
              name="stringTensionMains"
              type="number"
              min={5}
              max={100}
              step={1}
              placeholder="set tensions for mains"
              required
              defaultValue={page === 'edit' ? gearSet?.stringTensionMains : ''}
            />
            {state.errors?.stringTensionMains && (
              <FieldError msg={state.errors.stringTensionMains[0]} />
            )}
          </div>
          <div>
            <Label htmlFor="stringTensionCrosses">Tension Crosses</Label>
            <Input
              name="stringTensionCrosses"
              type="number"
              min={5}
              max={100}
              step={1}
              placeholder="set tensions for crosses"
              required
              defaultValue={
                page === 'edit' ? gearSet?.stringTensionCrosses : ''
              }
            />
            {state.errors?.stringTensionCrosses && (
              <FieldError msg={state.errors.stringTensionCrosses[0]} />
            )}
          </div>
        </div>

        {page === 'edit' ? (
          <input type="hidden" value={gearSet?.id} name="gearSetId" />
        ) : null}
        <Button disabled={pending}>
          {pending ? 'loading...' : page === 'new' ? 'create' : 'edit'}
        </Button>
      </form>
    </>
  );
}
