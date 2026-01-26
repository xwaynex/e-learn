import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import { getUsers } from "../server/users";
import { User } from "@repo/types";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default async function Home() {
  const users: User[] = await getUsers();

  return (
    <div className={styles.page}>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {" "}
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
