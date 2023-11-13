import React from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  selectedUserId?: number;
  onSelect?: (user: User | null) => void;
};

export const UsersList: React.FC<Props> = ({
  users,
  selectedUserId,
  onSelect = () => { },
}) => (
  <table className="table is-narrow">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th> </th>
      </tr>
    </thead>

    <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            {user.id === selectedUserId ? (
              <button
                onClick={() => onSelect(null)}
                className="icon button is-success"
              >
                <i className="far fa-eye-slash" />
              </button>
            ) : (
              <button
                onClick={() => onSelect(user)}
                className={classNames('icon button is-success is-inverted', {
                  'is-crossed-out': user.id === selectedUserId,
                })}
              >
                <i className="far fa-eye" />
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
