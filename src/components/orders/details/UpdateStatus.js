import SearchableSelectInput from '../../inputFields/SearchableSelectInput'

const UpdateStatus = ({ orderStatusData, setFieldValue, orderStatus }) => {

    const onStatusChange = (name, value) => {
        setFieldValue('order_status_id', value)
    }
    return (
        <>
            <SearchableSelectInput
                nameList={[
                    {
                        name: "order_status_id",
                        notitle: "true",
                        inputprops: {
                            name: "order_status_id",
                            id: "order_status_id",
                            options: orderStatusData || [],
                            value: orderStatus ? orderStatus?.name : '',
                        },
                        store: "obj",
                        setvalue: onStatusChange,
                    },
                ]}
            />
        </>
    )
}

export default UpdateStatus