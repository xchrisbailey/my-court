'use client';

import {
  addPractice,
  editPractice,
  PracticeActionState,
} from '@/app/practices/actions';
import { FieldError } from '@/components/field-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { GearSetWithRacketAndString, Practice } from '@/shared/types';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { use, useActionState, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';

const states = [
  { name: 'Alabama', abbreviation: 'AL' },
  { name: 'Alaska', abbreviation: 'AK' },
  { name: 'Arizona', abbreviation: 'AZ' },
  { name: 'Arkansas', abbreviation: 'AR' },
  { name: 'California', abbreviation: 'CA' },
  { name: 'Colorado', abbreviation: 'CO' },
  { name: 'Connecticut', abbreviation: 'CT' },
  { name: 'Delaware', abbreviation: 'DE' },
  { name: 'Florida', abbreviation: 'FL' },
  { name: 'Georgia', abbreviation: 'GA' },
  { name: 'Hawaii', abbreviation: 'HI' },
  { name: 'Idaho', abbreviation: 'ID' },
  { name: 'Illinois', abbreviation: 'IL' },
  { name: 'Indiana', abbreviation: 'IN' },
  { name: 'Iowa', abbreviation: 'IA' },
  { name: 'Kansas', abbreviation: 'KS' },
  { name: 'Kentucky', abbreviation: 'KY' },
  { name: 'Louisiana', abbreviation: 'LA' },
  { name: 'Maine', abbreviation: 'ME' },
  { name: 'Maryland', abbreviation: 'MD' },
  { name: 'Massachusetts', abbreviation: 'MA' },
  { name: 'Michigan', abbreviation: 'MI' },
  { name: 'Minnesota', abbreviation: 'MN' },
  { name: 'Mississippi', abbreviation: 'MS' },
  { name: 'Missouri', abbreviation: 'MO' },
  { name: 'Montana', abbreviation: 'MT' },
  { name: 'Nebraska', abbreviation: 'NE' },
  { name: 'Nevada', abbreviation: 'NV' },
  { name: 'New Hampshire', abbreviation: 'NH' },
  { name: 'New Jersey', abbreviation: 'NJ' },
  { name: 'New Mexico', abbreviation: 'NM' },
  { name: 'New York', abbreviation: 'NY' },
  { name: 'North Carolina', abbreviation: 'NC' },
  { name: 'North Dakota', abbreviation: 'ND' },
  { name: 'Ohio', abbreviation: 'OH' },
  { name: 'Oklahoma', abbreviation: 'OK' },
  { name: 'Oregon', abbreviation: 'OR' },
  { name: 'Pennsylvania', abbreviation: 'PA' },
  { name: 'Rhode Island', abbreviation: 'RI' },
  { name: 'South Carolina', abbreviation: 'SC' },
  { name: 'South Dakota', abbreviation: 'SD' },
  { name: 'Tennessee', abbreviation: 'TN' },
  { name: 'Texas', abbreviation: 'TX' },
  { name: 'Utah', abbreviation: 'UT' },
  { name: 'Vermont', abbreviation: 'VT' },
  { name: 'Virginia', abbreviation: 'VA' },
  { name: 'Washington', abbreviation: 'WA' },
  { name: 'West Virginia', abbreviation: 'WV' },
  { name: 'Wisconsin', abbreviation: 'WI' },
  { name: 'Wyoming', abbreviation: 'WY' },
];

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

type Props = {
  page: 'new' | 'edit';
  targetPracticePromise?: Promise<Practice | undefined>;
  gearPromise: Promise<GearSetWithRacketAndString[] | undefined>;
};

export function PracticeForm({
  page,
  targetPracticePromise,
  gearPromise,
}: Props) {
  const practice = targetPracticePromise
    ? use(targetPracticePromise)
    : undefined;
  const gear = use(gearPromise);
  const [date, setDate] = useState<Date>(
    new Date(practice?.playDate ?? new Date()),
  );
  const [mState, setMState] = useState<string>(practice?.state ?? '');
  const [editorHtmlContent, setEditorHtmlContent] = useState<string>(
    page === 'edit' ? (practice?.notes ?? '') : '',
  );

  const [state, action, pending] = useActionState<
    PracticeActionState,
    FormData
  >(page === 'new' ? addPractice : editPractice, {
    error: '',
  });

  return (
    <div className="mx-auto w-full max-w-xl">
      <h1>{page === 'new' ? 'Add Practice' : `Edit Practice`}</h1>
      <form action={action} className="space-y-5">
        <input type="submit" disabled hidden />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="Played Location"
              defaultValue={page === 'edit' ? practice?.location : ''}
              required
            />
            {state.errors?.location ? (
              <FieldError msg={state.errors.location[0]} />
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              placeholder="New York"
              required
              defaultValue={page === 'edit' ? practice?.city : ''}
            />
            {state.errors?.city ? (
              <FieldError msg={state.errors.city[0]} />
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Select name="state" value={mState} onValueChange={setMState}>
              <SelectTrigger aria-label="Select a state" id="state">
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                {states.map(state => (
                  <SelectItem
                    key={state.abbreviation}
                    value={state.abbreviation}
                  >
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.errors?.state ? (
              <FieldError msg={state.errors.state[0]} />
            ) : null}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            name="type"
            defaultValue={page === 'edit' ? practice?.type : ''}
          >
            <SelectTrigger aria-label="Select practice type" id="type">
              <SelectValue placeholder="Select practice type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="drill">Drill</SelectItem>
              <SelectItem value="singles">Single</SelectItem>
              <SelectItem value="doubles">Doubles</SelectItem>
              <SelectItem value="friendly hit">Friendly Hit</SelectItem>
              <SelectItem value="paid hit">Paid Hit</SelectItem>
              <SelectItem value="private lesson">Private Lesson</SelectItem>
            </SelectContent>
          </Select>
          {state.errors?.type ? (
            <FieldError msg={state.errors.type[0]} />
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="gearId">Gear Used</Label>
          <Select
            name="gearId"
            defaultValue={page === 'edit' ? (practice?.gearId ?? '') : ''}
          >
            <SelectTrigger aria-label="Select Your Gear" id="gearId">
              <SelectValue placeholder="Select Your Gear" />
            </SelectTrigger>
            <SelectContent>
              {gear ? (
                gear.map(g => (
                  <SelectItem value={g.id} key={g.id}>
                    {g.racket.model} with {g.strings.model}
                  </SelectItem>
                ))
              ) : (
                <p>
                  <Link href="/gear-sets/new">Add A Gear Set</Link>
                </p>
              )}
            </SelectContent>
          </Select>
          {state.errors?.gearId ? (
            <FieldError msg={state.errors.gearId[0]} />
          ) : null}
        </div>
        <div className="space-y-2">
          <Label>Date played</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full pl-3 text-left font-normal',
                  !date && 'text-muted-foreground',
                )}
              >
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto w-4 h-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={day => day && setDate(day)}
                disabled={date =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Input
            type="hidden"
            name="playDate"
            value={date ? date.toISOString() : ''}
          />
          {state.errors?.playDate ? (
            <FieldError msg={state.errors.playDate[0]} />
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <div className="flex flex-col p-2 w-full rounded-md border min-h-[20ch]">
            <ReactQuill
              value={editorHtmlContent}
              onChange={setEditorHtmlContent}
            />
          </div>
          <input type="hidden" name="notes" value={editorHtmlContent} />
          {state.errors?.notes ? (
            <FieldError msg={state.errors.notes[0]} />
          ) : null}
        </div>

        {page === 'edit' ? (
          <input type="hidden" value={practice?.id} name="matchId" />
        ) : null}
        <Button disabled={pending}>
          {pending ? 'loading...' : page === 'new' ? 'add' : 'edit'}
        </Button>
      </form>
    </div>
  );
}
