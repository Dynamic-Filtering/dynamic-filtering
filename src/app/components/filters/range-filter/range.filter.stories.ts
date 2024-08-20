import type { Meta, StoryObj } from '@storybook/angular';
import { RangeFilter } from '../../../../models/filtering/range-filter.model';
import { RangeFilterComponent } from './range-filter.component';

const meta: Meta<RangeFilterComponent> = {
    title: 'Filters/Range filter',
    component: RangeFilterComponent,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        filter: new RangeFilter('Display value', 'column'),
    },
};

export default meta;
type Story = StoryObj<RangeFilterComponent>;

export const Default: Story = {};
