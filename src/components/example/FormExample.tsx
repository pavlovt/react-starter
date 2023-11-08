import { Form } from 'houseform'
import { Button, Input } from '../form'

const FormExample = () => (
  <Form onSubmit={values => console.log(values)}>
    {({ submit }) => (
      <div>
        <Input name="example" label="Example" />
        <Button onClick={submit}>Submit</Button>
      </div>
    )}
  </Form>
)

export default FormExample
