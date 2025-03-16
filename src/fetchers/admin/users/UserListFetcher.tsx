import { useUserList } from "@/hooks/query/users/useUserList";
import useDateFormat from "@/hooks/useDateFormat";
import { Link } from "react-router-dom";

export default function UserListFetcher() {
  const { users } = useUserList();
  const { formatDate } = useDateFormat();

  return (
    <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          <td className="border px-4 py-2">{user.id}</td>
          <td className="border px-4 py-2">{user.email}</td>
          <td className="border px-4 py-2">{user.subscriptionType}</td>
          <td className="border px-4 py-2">{user.role}</td>
          <td className="border px-4 py-2">{user.threadsUnfollowCount}</td>
          <td className="border px-4 py-2">{user.instagramUnfollowCount}</td>
          <td className="border px-4 py-2">{user.instagramAutomationCount}</td>
          <td className="border px-4 py-2">{user.naverAutomationCount}</td>
          <td className="border px-4 py-2">{user.naverImageDownloadCount}</td>
          <td className="border px-4 py-2">{user.nickname}</td>
          <td className="border px-4 py-2">{user.point}</td>
          <td className="border px-4 py-2">{formatDate(user.createdAt)}</td>
          <td className="border px-4 py-2">
            {user.premiumEndDate === null
              ? "없음"
              : formatDate(user.premiumEndDate)}
          </td>
          <td className="border px-4 py-2">
            <div className="flex justify-between items-center">
              <Link
                to={`/admin/users/edit/${user.id}`}
                className="text-blue-500"
              >
                구독 유형 변경하기
              </Link>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
