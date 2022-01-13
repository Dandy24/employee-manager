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
import { CompanyEntity } from '../../models/entities/company-entity';

export interface EmployeeFormProps {
    submitText: string;
    activeEdit?: boolean;
    employeeEdit?: boolean;
    companiesList?: CompanyEntity[];
}

export const EmployeeForm: React.FC<EmployeeFormProps> = observer((props: EmployeeFormProps): JSX.Element => {
    const { activeEdit, employeeEdit, companiesList, submitText } = props;

    return (
        <Form>
            <Row justify="center">
                <div data-testid={'employee-form'}>
                    <TextInput label="Jméno" name="first_name" />

                    <TextInput label="Příjmení" name="last_name" />

                    <NumberInput label="Telefon" name="phone" />

                    <TextInput label="Email" name="email" />

                    <CategorySelectList name="working_category" label="Kategorizace práce" />

                    <DateSelector name="med_exam_date" label="Datum vstupní prohlídky" />

                    <DateSelector name="job_assign_date" label="Datum nástupu do práce" />

                    <TextArea name="health_limitations" label="Zdravotní omezení" rows={3} textareaSize="large" />

                    {activeEdit ? <CustomSwitch label="Aktivní" name="active" /> : null}

                    {employeeEdit && companiesList ? (
                        <CompanySelectList companies={companiesList} name="company" label="Firma" />
                    ) : null}

                    <Col span={12} offset={9} style={{ marginTop: '3vh' }}>
                        <Button type="primary" htmlType="submit" data-testid="submit-button">
                            {submitText}
                        </Button>
                    </Col>
                </div>
            </Row>
        </Form>
    );
});
