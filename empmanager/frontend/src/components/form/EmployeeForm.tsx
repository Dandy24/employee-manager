import { Form } from 'formik';
import React from 'react';
import { TextInput } from './elements/TextInput';
import { NumberInput } from './elements/NumberInput';
import { Button, Col, Row } from 'antd';
import { CategorySelectList } from './elements/SelectList';
import { DateSelector } from './elements/DateSelector';
import { TextArea } from './elements/TextArea';
import { CompanySelectList } from './elements/CompanySelectList';
import { CustomSwitch } from './elements/CustomSwitch';
import { observer } from 'mobx-react-lite';
import { WorkingCategoryEnum } from '../../models/enums/working-category-enum';

export interface EmployeeFormProps {
    submitText: string;
    activeEdit?: boolean;
    employeeEdit?: boolean;
    companiesList?: any[]; //TODO fix type
}

export const EmployeeForm: React.FC<EmployeeFormProps> = observer((props: EmployeeFormProps): JSX.Element => {
    const { activeEdit, employeeEdit, companiesList, submitText } = props;

    return (
        <Form>
            <Row justify="center">
                <div>
                    <TextInput label="Jméno" spacesize="large" name="first_name" />

                    <TextInput label="Příjmení" spacesize="large" name="last_name" />

                    <NumberInput label="Telefon" spacesize="large" name="phone" />

                    <TextInput label="Email" spacesize="large" name="email" />

                    <CategorySelectList name="working_category" label="Kategorizace práce" spacesize="large" />

                    <DateSelector name="med_exam_date" label="Datum vstupní prohlídky" spacesize="large" />

                    <DateSelector name="job_assign_date" label="Datum nástupu do práce" spacesize="large" />

                    <TextArea
                        name="health_limitations"
                        label="Zdravotní omezení"
                        spacesize="large"
                        rows={3}
                        textareaSize="large"
                    />

                    {activeEdit ? <CustomSwitch label="Aktivní" name="active" spacesize="large" /> : null}

                    {employeeEdit && companiesList ? (
                        <CompanySelectList companies={companiesList} name="company" label="Firma" />
                    ) : null}

                    <Col span={12} offset={9} style={{ marginTop: '3vh' }}>
                        <Button type="primary" htmlType="submit">
                            {submitText}
                        </Button>
                    </Col>
                </div>
            </Row>
        </Form>
    );
});
