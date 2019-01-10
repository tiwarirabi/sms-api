import Knex from 'knex';

import * as db from '../utils/db';
import { Employee } from '../domains/employee';
import * as objectUtil from '../utils/object';

const USER_TABLE = 'users';
const USER_EMPLOYEE_TABLE = 'users_employee';
const OFFICE_TABLE = 'users_office';

const EMPLOYEE_SELECT_VALUES = [
    'employee.id as id',
    'employee.department as department',
    'employee.is_admin_blocked as isAdminBlocked',
    'employee.is_office_blocked as isOfficeBlocked',
    'employee.designation as designation',
    'employee.birth_date as birthDate',
    'employee.gender as gender',
    'employee.identification_document_picture as identificationDocumentPicture',
    'employee.is_veg as isVeg',
    'employee.joining_date as joiningDate',
    'employee.employment_type as employmentType',

    'office.id as officeId',
    'office.name as officeName',
    'office.location as officeLocation',
    'office.location_gps as officeLocationGps',
    'office.no_of_employees as officeNoOfEmployees',
    'office.max_budget as officeMaxBudget',
    'office.phone as officePhone',
    'office.pan_no as officePanNo',
    'office.regd_no as officeRegdNo',
    'office.is_verified as officeIsVerified',
    'office.verified_at as officeVerifiedAt',
    'office.delivery_time as officeDeliveryTime',
    'office.remarks as officeRemarks',

    'officeUser.id as officeUserId',
    'officeUser.email as officeUserEmail',
    'officeUser.type as officeUserType',
    'officeUser.first_name as officeUserFirstName',
    'officeUser.middle_name as officeUserMiddleName',
    'officeUser.last_name as officeUserLastName',
    'officeUser.mobile as officeUserMobile',
    'officeUser.display_picture as officeUserDispayPicture',
    'officeUser.last_logged_in as officeUserLastLoggedIn',

    'user.id as userId',
    'user.email as userEmail',
    'user.type as userType',
    'user.first_name as userFirstName',
    'user.middle_name as userMiddleName',
    'user.last_name as userLastName',
    'user.mobile as userMobile',
    'user.display_picture as userDispayPicture',
    'user.last_logged_in as userLastLoggedIn',

    'verifier.id as verifierId',
    'verifier.email as verifierEmail',
    'verifier.type as verifierType',
    'verifier.first_name as verifierFirstName',
    'verifier.middle_name as verifierMiddleName',
    'verifier.last_name as verifierLastName',
    'verifier.mobile as verifierMobile',
    'verifier.display_picture as verifierDispayPicture',
    'verifier.last_logged_in as verifierLastLoggedIn',

    'creator.id as creatorId',
    'creator.email as creatorEmail',
    'creator.type as creatorType',
    'creator.first_name as creatorFirstName',
    'creator.middle_name as creatorMiddleName',
    'creator.last_name as creatorLastName',
    'creator.mobile as creatorMobile',
    'creator.display_picture as creatorDispayPicture',
    'creator.last_logged_in as creatorLastLoggedIn',

    'updator.id as updatorId',
    'updator.email as updatorEmail',
    'updator.type as updatorType',
    'updator.first_name as updatorFirstName',
    'updator.middle_name as updatorMiddleName',
    'updator.last_name as updatorLastName',
    'updator.mobile as updatorMobile',
    'updator.display_picture as updatorDispayPicture',
    'updator.last_logged_in as updatorLastLoggedIn',
];

/**
 * Fetch all employee.
 *
 * @param {object} params
 * @param {knex} tx
 */
export async function fetch(
  employeeId?: number,
  tx?: Knex
): Promise<Employee[]> {
  const whereParam = employeeId ? { 'employee.id': employeeId } : {};

  return db
    .connection(tx)(`${USER_EMPLOYEE_TABLE} as employee`)
    .leftJoin(`${USER_TABLE} as user`,'employee.user_id','user.id')
    .leftJoin(`${OFFICE_TABLE} as office`,'employee.office_id','office.id')
    .leftJoin(`${USER_TABLE} as officeUser`,'officeUser.id','office.user_id')
    .leftJoin(`${USER_TABLE} as verifier`,'office.verified_by','verifier.id')
    .leftJoin(`${USER_TABLE} as creator`,'employee.created_by','creator.id')
    .leftJoin(`${USER_TABLE} as updator`,'employee.updated_by','updator.id')
    .select(EMPLOYEE_SELECT_VALUES)
    .where(whereParam)
    .then( (response: any) => response.map((data: any) => mapEmployeeToModel(data)));    
}


/**
 * Fetch employee by userId.
 *
 * @param {object} params
 * @param {knex} tx
 */
export async function fetchByUserId(
    userId?: number,
    tx?: Knex
  ): Promise<Employee[]> {
    const whereParam = userId ? { 'employee.user_id': userId } : {};
  
    return db
      .connection(tx)(`${USER_EMPLOYEE_TABLE} as employee`)
      .leftJoin(`${USER_TABLE} as user`,'employee.user_id','user.id')
      .leftJoin(`${OFFICE_TABLE} as office`,'employee.office_id','office.id')
      .leftJoin(`${USER_TABLE} as officeUser`,'officeUser.id','office.user_id')
      .leftJoin(`${USER_TABLE} as verifier`,'office.verified_by','verifier.id')
      .leftJoin(`${USER_TABLE} as creator`,'employee.created_by','creator.id')
      .leftJoin(`${USER_TABLE} as updator`,'employee.updated_by','updator.id')
      .select(EMPLOYEE_SELECT_VALUES)
      .where(whereParam)
      .then( (response: any) => response.map((data: any) => mapEmployeeToModel(data)));    
  }


  /**
 * Fetch employee by officeId.
 *
 * @param {object} params
 * @param {knex} tx
 */
export async function fetchByOfficeId(
    officeId?: number,
    tx?: Knex
  ): Promise<Employee[]> {
    const whereParam = officeId ? { 'employee.office_id': officeId } : {};
  
    return db
      .connection(tx)(`${USER_EMPLOYEE_TABLE} as employee`)
      .leftJoin(`${USER_TABLE} as user`,'employee.user_id','user.id')
      .leftJoin(`${OFFICE_TABLE} as office`,'employee.office_id','office.id')
      .leftJoin(`${USER_TABLE} as officeUser`,'officeUser.id','office.user_id')
      .leftJoin(`${USER_TABLE} as verifier`,'office.verified_by','verifier.id')
      .leftJoin(`${USER_TABLE} as creator`,'employee.created_by','creator.id')
      .leftJoin(`${USER_TABLE} as updator`,'employee.updated_by','updator.id')
      .select(EMPLOYEE_SELECT_VALUES)
      .where(whereParam)
      .then( (response: any) => response.map((data: any) => mapEmployeeToModel(data)));    
  }

/**
 * Save employee.
 *
 * @param {Employee} employee
 * @param {knex} tx
 */
export function save(employee: Employee, tx?: Knex) {
  return db
    .connection(tx)(USER_EMPLOYEE_TABLE)
    .insert(employee);
}

/**
 * Update employee.
 *
 * @param {number} id
 * @param {Employee} body
 * @param {knex} tx
 */
export function update(id: number, body: Employee, tx?: Knex) {
  return db
    .connection(tx)(USER_EMPLOYEE_TABLE)
    .where({ id })
    .update(body);
}

/**
 * Delete employee.
 *
 * @param {number} id
 * @param {knex} tx
 */
export function remove(id: number, tx?: Knex) {
  return db
    .connection(tx)(USER_EMPLOYEE_TABLE)
    .where({ id })
    .delete();
}

/**
 * Map an object to Employee interface type.
 * @param {Any} obj 
 */
function mapEmployeeToModel(obj: any): Employee{

    const employee: Employee = {
        ...objectUtil.withOnlyAttrs(obj,[
            'id', 'department','isAdminBlocked','isOfficeBlocked','designation','birthDate','gender', 
            'identificationDocumentPicture', 'isVeg','joiningDate','employmentType'
        ]),
    };

    if (obj.hasOwnProperty('officeId') && obj.officeId) {
        employee.office = {
            id: obj.officeId,
            name: obj.officeName,
            location: obj.officeLocation,
            locationGps: obj.officeLocationGps,
            noOfEmployees: obj.officeNoOfEmployees,
            maxBudget: obj.officeMaxBudget,
            phone: obj.officePhone,
            panNo: obj.officePanNo,
            redgNo: obj.officeRegdNo,
            isVerified: obj.officeIsVerified,
            verifiedAt: obj.officeVerifiedAt,
            deliveryTime: obj.officeDeliveryTime,
            remarks: obj.officeRemarks,
        };
    }
    
    if (obj.hasOwnProperty('officeUserId') && obj.officeUserId) {
        employee.office.user = {
            id: obj.officeUserId,
            type: obj.officeUserType,
            email: obj.officeUserEmail,
            firstName: obj.officeUserFirstName,
            middleName: obj.officeUserMiddleName,
            lastName: obj.officeUserLastName,
            lastLoggedIn: obj.officeUserLastLoggedIn,
            displayPicture: obj.officeUserDisplayPicture ? obj.officeUserDisplayPicture  : null ,
            mobile: obj.officeUserMobile,
        };
    }

    if (obj.hasOwnProperty('verifierId') && obj.verifierId) {
        employee.office.verifiedBy = {
            id: obj.verifierId,
            type: obj.verifierType,
            email: obj.verifierEmail,
            firstName: obj.verifierFirstName,
            middleName: obj.verifierMiddleName,
            lastName: obj.verifierLastName,
            lastLoggedIn: obj.verifierLastLoggedIn,
            displayPicture: obj.verifierDisplayPicture ? obj.verifierDisplayPicture  : null ,
            mobile: obj.verifierMobile,
        };
    }

    if (obj.hasOwnProperty('userId') && obj.userId) {
        employee.user = {
        id: obj.userId,
        type: obj.userType,
        email: obj.userEmail,
        firstName: obj.userFirstName,
        middleName: obj.userMiddleName,
        lastName: obj.userLastName,
        lastLoggedIn: obj.userLastLoggedIn,
        displayPicture: obj.userDisplayPicture ? obj.userDisplayPicture  : null ,
        mobile: obj.userMobile,
        };
    }

    if (obj.hasOwnProperty('creatorId') && obj.creatorId) {
        employee.createdBy = {
            id: obj.creatorId,
            type: obj.creatorType,
            email: obj.creatorEmail,
            firstName: obj.creatorFirstName,
            middleName: obj.creatorMiddleName,
            lastName: obj.creatorLastName,
            lastLoggedIn: obj.creatorLastLoggedIn,
            displayPicture: obj.creatorDisplayPicture,
            mobile: obj. creatorMobile,
        };
        }
    
    if (obj.hasOwnProperty('updatorId') && obj.updatorId) {
        employee.updatedBy = {
            id: obj.updatorId,
            type: obj.updatorType,
            email: obj.updatorEmail,
            firstName: obj.updatorFirstName,
            middleName: obj.updatorMiddleName,
            lastName: obj.updatorLastName,
            lastLoggedIn: obj.updatorLastLoggedIn,
            displayPicture: obj.updatorDisplayPicture,
            mobile: obj. updatorMobile,
        };
        }
    
    return employee;
}