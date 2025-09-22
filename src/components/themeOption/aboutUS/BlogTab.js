import CheckBoxField from '../../inputFields/CheckBoxField'
import { blog } from '../../../utils/axiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import request from '../../../utils/axiosUtils';
import MultiSelectField from '../../inputFields/MultiSelectField';

const BlogTab = ({ values, setFieldValue }) => {
    const { data } = useQuery({queryKey: [blog], queryFn: () => request({ url: blog }),
        refetchOnWindowFocus: false, select: (res) => res?.data?.data.map((elem) => { return { id: elem?.id, name: elem.title } })
    });
    if (!data) return null
    return (
        <>
            <CheckBoxField name="[options][about_us][blog][status]" title="status" />
            <MultiSelectField values={values} setFieldValue={setFieldValue} name='aboutUsBlog' title="Blogs" data={data} />
        </>
    )
}

export default BlogTab