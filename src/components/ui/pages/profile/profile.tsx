import { FC } from 'react';

import { Button, Input } from '@zlden/react-developer-burger-ui-components';
import styles from './profile.module.css';
import commonStyles from '../common.module.css';

import { ProfileUIProps } from './type';
import { ProfileMenu } from '@components';

export const ProfileUI: FC<ProfileUIProps> = ({
  formValue,
  isFormChanged,
  isEditing,
  updateUserError,
  handleSubmit,
  handleCancel,
  handleInputChange,
  startEditing
}) => (
  <main className={`${commonStyles.container}`}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>
    <form
      className={`mt-30 ${styles.form} ${commonStyles.form}`}
      onSubmit={handleSubmit}
    >
      <>
        <div className='pb-6'>
          {isEditing ? (
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={handleInputChange}
              value={formValue.name}
              name={'name'}
              error={false}
              errorText={''}
              size={'default'}
              icon={'EditIcon'}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            />
          ) : (
            <div className={`${styles.userInfo} mb-2`}>
              <p className='text text_type_main-default text_color_inactive'>
                Имя:
              </p>
              <p className='text text_type_main-medium ml-2'>
                {formValue.name}
              </p>
              <div className={styles.editButtonWrapper}>
                <Button
                  htmlType='button'
                  type='secondary'
                  size='small'
                  onClick={startEditing}
                >
                  Изменить
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className='pb-6'>
          {isEditing ? (
            <Input
              type={'email'}
              placeholder={'E-mail'}
              onChange={handleInputChange}
              value={formValue.email}
              name={'email'}
              error={false}
              errorText={''}
              size={'default'}
              icon={'EditIcon'}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            />
          ) : (
            <div className={`${styles.userInfo} mb-2`}>
              <p className='text text_type_main-default text_color_inactive'>
                E-mail:
              </p>
              <p className='text text_type_main-medium ml-2'>
                {formValue.email}
              </p>
            </div>
          )}
        </div>
        {isFormChanged && (
          <div className={styles.button}>
            <Button
              type='secondary'
              htmlType='button'
              size='medium'
              onClick={handleCancel}
            >
              Отменить
            </Button>
            <Button type='primary' size='medium' htmlType='submit'>
              Сохранить
            </Button>
          </div>
        )}
        {updateUserError && (
          <p
            className={`${commonStyles.error} pt-5 text text_type_main-default`}
          >
            {updateUserError}
          </p>
        )}
      </>
    </form>
  </main>
);
