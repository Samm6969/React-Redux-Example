import formGroup from '../hoc/formGroup'
import Select from '../components/Select'
import Input from '../components/Input'
import Checkbox from '../components/Checkbox'
import CommentInput from '../components/CommentInput'
import DatePicker from '../components/DatePicker'

export const SelectField = formGroup(Select)

export const CheckboxField = formGroup(Checkbox)

export const InputField = formGroup(Input)

export const CommentField = formGroup(CommentInput)

export const DatePickerInput = formGroup(DatePicker)
