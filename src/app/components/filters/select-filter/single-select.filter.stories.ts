import type { Meta, StoryObj } from '@storybook/angular';
import { SingleSelectFilterComponent } from './single-select-filter/single-select-filter.component';
import { SingleSelectFilter } from '../../../../models/filtering/select-filter/single-select-filter.model';

const meta: Meta<SingleSelectFilterComponent> = {
    title: 'Filters/Select filter',
    component: SingleSelectFilterComponent,
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
type Story = StoryObj<SingleSelectFilterComponent>;

export const Default: Story = {};
