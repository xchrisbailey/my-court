'use client';

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
import { GearSetWithRelations, Match } from '@/shared/types';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { use, useActionState, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import { addMatch, editMatch, MatchActionState } from '../actions';
import { SetScoreCard } from './set-score-card';

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
  targetMatchPromise?: Promise<Match | undefined>;
  gearPromise: Promise<GearSetWithRelations[] | undefined>;
};

export function MatchForm({ page, targetMatchPromise, gearPromise }: Props) {
  const match = targetMatchPromise ? use(targetMatchPromise) : undefined;
  const gear = use(gearPromise);
  const [date, setDate] = useState<Date>(
    new Date(match?.playDate ?? new Date()),
  );
  const [mState, setMState] = useState<string>(match?.state ?? '');
  const [editorHtmlContent, setEditorHtmlContent] = useState<string>(
    page === 'edit' ? (match?.notes ?? '') : '',
  );

  const [state, action, pending] = useActionState<MatchActionState, FormData>(
    page === 'new' ? addMatch : editMatch,
    {
      error: '',
    },
  );

  return (
    <div className="mx-auto w-full max-w-xl">
      <h1>{page === 'new' ? 'Add Match' : `Edit Match`}</h1>
      <form action={action} className="space-y-5">
        <input type="submit" disabled hidden />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="Played Location"
              defaultValue={page === 'edit' ? match?.location : ''}
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
              defaultValue={page === 'edit' ? match?.city : ''}
            />
            {state.errors?.city ? (
              <FieldError msg={state.errors.city[0]} />
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Select name="state" value={mState} onValueChange={setMState}>
              <SelectTrigger aria-label="Select a state">
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
          <Label htmlFor="organization">Organization</Label>
          <Select
            name="organization"
            defaultValue={page === 'edit' ? match?.organization : ''}
          >
            <SelectTrigger aria-label="Select a organization">
              <SelectValue placeholder="Select a organization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usta">USTA</SelectItem>
              <SelectItem value="utr">UTR</SelectItem>
            </SelectContent>
          </Select>
          {state.errors?.organization ? (
            <FieldError msg={state.errors.organization[0]} />
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="gearId">Gear Used</Label>
          <Select
            name="gearId"
            defaultValue={page === 'edit' ? (match?.gearId ?? '') : ''}
          >
            <SelectTrigger aria-label="Select Your Gear">
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

        {['first', 'second', 'third'].map((set, index) => (
          <div key={set} className="space-y-4">
            <SetScoreCard
              set={index + 1}
              prevState={page === 'edit' ? match : undefined}
            />
          </div>
        ))}

        {page === 'edit' ? (
          <input type="hidden" value={match?.id} name="matchId" />
        ) : null}
        <Button disabled={pending}>
          {pending ? 'loading...' : page === 'new' ? 'add' : 'edit'}
        </Button>
      </form>
    </div>
  );
}
