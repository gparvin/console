/* Copyright Contributors to the Open Cluster Management project */
'use strict'

import React from 'react'
import ControlPanelSkeleton from './ControlPanelSkeleton'
import { render } from '@testing-library/react'

export const control = {
    active: false,
    name: 'creation.app.name',
    tooltip: 'tooltip.creation.app.name',
    controlData: [],
    id: 'checkbox',
    type: 'checkbox',
}

describe('ControlPanelSkeleton component', () => {
    it('renders as expected', () => {
        const fn = jest.fn()

        const Component = () => {
            return (
                <ControlPanelSkeleton
                    key={'key'}
                    control={control}
                    controlId={'controlId'}
                    handleChange={fn}
                    i18n={fn}
                />
            )
        }
        const { asFragment } = render(<Component />)
        expect(asFragment()).toMatchSnapshot()
    })
})