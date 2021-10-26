/* Copyright Contributors to the Open Cluster Management project */
import { render } from '@testing-library/react'
import { CIM } from 'openshift-assisted-ui-lib'
import { MemoryRouter, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import { infraEnvironmentsState } from '../../../atoms'
import { clickByText, waitForNotText, waitForTestId, waitForText } from '../../../lib/test-util'
import { NavigationPath } from '../../../NavigationPath'
import InfraEnvironmentsPage from './InfraEnvironmentsPage'

export const infraEnvName = 'infra-env-name'

export const mockInfraEnv1 = {
    apiVersion: 'agent-install.openshift.io/v1beta1',
    kind: 'InfraEnv',
    metadata: {
        labels: {
            'agentclusterinstalls.extensions.hive.openshift.io/location': 'brno',
            networkType: 'dhcp',
        },
        name: infraEnvName,
        namespace: infraEnvName,
    },
    spec: {
        agentLabels: {
            'agentclusterinstalls.extensions.hive.openshift.io/location': 'brno',
        },
        pullSecretRef: {
            name: `pullsecret-${infraEnvName}`,
        },
    },
    status: {
        agentLabelSelector: {
            matchLabels: {
                'infraenvs.agent-install.openshift.io': infraEnvName,
            },
        },
        conditions: [
            {
                lastTransitionTime: '2021-10-04T11:26:37Z',
                message: 'Image has been created',
                reason: 'ImageCreated',
                status: 'True',
                type: 'ImageCreated',
            },
        ],
        debugInfo: {},
        isoDownloadURL: 'https://my.funny.download.url',
    },
}

const mockInfraEnvironments: CIM.InfraEnvK8sResource[] = [mockInfraEnv1]

const Component = () => {
    return (
        <RecoilRoot
            initializeState={(snapshot) => {
                snapshot.set(infraEnvironmentsState, mockInfraEnvironments)
            }}
        >
            <MemoryRouter initialEntries={[NavigationPath.infraEnvironments]}>
                <Route path={NavigationPath.infraEnvironments}>
                    <InfraEnvironmentsPage />
                </Route>
            </MemoryRouter>
        </RecoilRoot>
    )
}

describe('Infrastructure Environments page', () => {
    test('can render', async () => {
        render(<Component />)

        await waitForText('infraenv:infraenvs', true)

        // the top-level hint
        await waitForText('cim:cim.infra.banner.body')
        await clickByText('cim.banner.dismiss')
        await waitForNotText('cim:cim.infra.banner.body')

        await waitForTestId('createInfraEnv')

        // is the infraEnv listed?
        await waitForText(infraEnvName, true)

        // screen.debug(undefined, -1)
    })
})