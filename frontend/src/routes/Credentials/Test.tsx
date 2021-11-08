/* Copyright Contributors to the Open Cluster Management project */
import { Page, PageSection } from '@patternfly/react-core'

export default function Test() {
    return (
        <Page>
            <PageSection variant="light">{/* <Title headingLevel="h5">Test page</Title> */}</PageSection>
        </Page>
        // Below doees not work...
        // <Page additionalGroupedContent={<Title headingLevel="h4">Page title</Title>} groupProps={{ sticky: 'top' }}>
        //     <PageSection variant="light">
        //         <Title headingLevel="h5">Test page</Title>
        //     </PageSection>
        // </Page>
    )
}
