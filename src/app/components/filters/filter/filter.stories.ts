import type { Meta, StoryObj } from '@storybook/angular';
import { FilterComponent } from './filter.component';
import { SelectFilter } from '../../../models/filtering/select-filter/select-filter.model';
import { RangeFilter } from '../../../models/filtering/range-filter/range-filter.model';

const meta: Meta<FilterComponent> = {
    title: 'Filters/Filter',
    component: FilterComponent,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<FilterComponent>;

export const SelectFilterProxy: Story = {
    args: {
        filter: new SelectFilter('Display value', 'column', [
            {
                id: 1,
                value: 1,
                label: 'Label1',
            },
            {
                id: 2,
                value: 2,
                label: 'Label2',
            },
            {
                id: 3,
                value: 3,
                label: 'Label3',
            },
            {
                id: 4,
                value: 4,
                label: 'Label4',
            },
        ]),
    },
};

export const RangeFilterProxy: Story = {
    args: {
        filter: new RangeFilter('Display value', 'column'),
    },
};
