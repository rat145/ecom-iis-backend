import React from 'react'
import SearchableSelectInput from '../inputFields/SearchableSelectInput'
import CheckBoxField from '../inputFields/CheckBoxField'

const UserRole = ({ fixedRole, rolesData }) => {
    return (
        <>
            {!fixedRole && (
                <>
                    <SearchableSelectInput
                        nameList={[
                            {
                                name: "role_id",
                                require: "true",
                                title: "Role",
                                inputprops: {
                                    name: "role_id",
                                    id: "role_id",
                                    options: rolesData || [],
                                    defaultOption: "Select state",
                                },
                            },
                        ]}
                    />
                    <CheckBoxField name="status" />
                </>
            )}
        </>
    )
}

export default UserRole