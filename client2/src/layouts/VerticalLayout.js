// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

const VerticalLayout = props => {
    return <Layout footer=" " {...props}>{props.children}</Layout>
}

export default VerticalLayout
