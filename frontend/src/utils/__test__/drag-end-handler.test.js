import React from 'react';
import { isInvalid } from '../drag-end-handler';
import { WorkingCategoryEnum } from '../../models/enums/working-category-enum';
import moment from 'moment';
import { ShiftStore } from '../../stores/shift-store';
import { RootStore } from '../../stores/root-store';
import { ShiftTypeEnum } from '../../models/enums/shift-type-enum';

const availableEmployees = [
    {
        id: 1,
        first_name: 'Test',
        last_name: 'Employee',
        email: 'test@email.com',
        phone: 420123456789,
        active: true,
        med_exam_date: moment('2022-02-01').toDate(),
        job_assign_date: moment('2022-02-12').toDate(),
        working_category: WorkingCategoryEnum.C,
        health_limitations: '',
        company: 1,
    },
    {
        id: 2,
        first_name: 'Next',
        last_name: 'Employee',
        email: 'next@email.com',
        phone: 420123456789,
        active: false,
        med_exam_date: '2022-02-01',
        job_assign_date: '2022-02-12',
        working_category: WorkingCategoryEnum.C,
        health_limitations: '',
        company: 1,
    },
];

const employee1 = {
    id: 1,
    first_name: 'Test',
    last_name: 'Employee',
    email: 'test@email.com',
    phone: 420123456789,
    active: true,
    med_exam_date: '2022-02-01',
    job_assign_date: '2022-02-12',
    working_category: WorkingCategoryEnum.C,
    health_limitations: '',
    company: 1,
};

const employee2 = {
    id: 2,
    first_name: 'Next',
    last_name: 'Employee',
    email: 'next@email.com',
    phone: 420123456789,
    active: false,
    med_exam_date: '2022-02-01',
    job_assign_date: '2022-02-12',
    working_category: WorkingCategoryEnum.C,
    health_limitations: '',
    company: 1,
};

const employee3 = {
    id: 3,
    first_name: 'Last',
    last_name: 'Employee',
    email: 'last@email.com',
    phone: 420123456789,
    active: true,
    med_exam_date: '2022-02-01',
    job_assign_date: '2022-02-12',
    working_category: WorkingCategoryEnum.C,
    health_limitations: '',
    company: 1,
};

const shiftList = [
    {
        id: 1,
        date: '2022-02-01',
        time: ShiftTypeEnum.Rano,
        companyID: 1,
        employeeIDs: [1],
    },
    {
        id: 2,
        date: '2022-02-01',
        time: ShiftTypeEnum.Odpoledne,
        companyID: 1,
        employeeIDs: [1],
    },
];

test('Adding employee already assigned elsewhere', async () => {
    const currentShift = {
        id: 1,
        date: '2022-02-01',
        time: ShiftTypeEnum.Rano,
        companyID: 1,
        employeeIDs: [1],
    };

    const rootStore = new RootStore();
    const shiftStore = new ShiftStore(rootStore);

    shiftStore.availableEmployees = availableEmployees;

    shiftStore.shift = currentShift;
    shiftStore.shiftListForDay = shiftList;

    const res = isInvalid(employee1, shiftStore);
    expect(res).not.toBeFalsy();
    expect(res).toBe('Zaměstnanec se v tento den již nachází na směně ranni');
});

test('Adding inactive employee to shift', async () => {
    const currentShift = {
        id: 2,
        date: '2022-02-02',
        time: ShiftTypeEnum.Rano,
        companyID: 1,
        employeeIDs: [],
    };

    const rootStore = new RootStore();
    const shiftStore = new ShiftStore(rootStore);

    shiftStore.availableEmployees = availableEmployees;

    shiftStore.shift = currentShift;
    shiftStore.shiftListForDay = shiftList;

    const res = isInvalid(employee2, shiftStore);
    expect(res).not.toBeFalsy();
    expect(res).toBe('Zaměstnanec je neaktivní');
});

test('Adding correct employee to shift', async () => {
    const currentShift = {
        id: 1,
        date: '2022-02-01',
        time: ShiftTypeEnum.Rano,
        companyID: 1,
        employeeIDs: [1],
    };

    const rootStore = new RootStore();
    const shiftStore = new ShiftStore(rootStore);

    shiftStore.availableEmployees = availableEmployees;

    shiftStore.shift = currentShift;
    shiftStore.shiftListForDay = shiftList;

    const res = isInvalid(employee3, shiftStore);
    expect(res).not.toBeNull();
    expect(res).toBeFalsy();
});
