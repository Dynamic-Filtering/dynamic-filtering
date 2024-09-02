import type { Meta, StoryObj } from '@storybook/angular';
import { SelectFilterComponent } from './select-filter.component';
import { SingleSelectFilter } from '../../../../models/filtering/select-filter/single-select-filter.model';

const meta: Meta<SelectFilterComponent> = {
    title: 'Filters/Select filter',
    component: SelectFilterComponent,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        filter: new SingleSelectFilter('Display value', 'column', [
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

export default meta;
type Story = StoryObj<SelectFilterComponent>;

export const Default: Story = {};
