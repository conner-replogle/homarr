import {
  AppShell,
  Burger,
  Drawer,
  Flex,
  Footer,
  Group,
  NavLink,
  Navbar,
  Paper,
  Text,
  ThemeIcon,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBook2,
  IconBrandDiscord,
  IconBrandGithub,
  IconGitFork,
  IconHome,
  IconLayoutDashboard,
  IconMailForward,
  IconQuestionMark,
  IconSettings2,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useScreenLargerThan } from '~/hooks/useScreenLargerThan';
import { usePackageAttributesStore } from '~/tools/client/zustands/usePackageAttributesStore';

import { MainHeader } from '../Header/Header';

interface ManageLayoutProps {
  children: ReactNode;
}

export const ManageLayout = ({ children }: ManageLayoutProps) => {
  const { attributes } = usePackageAttributesStore();
  const theme = useMantineTheme();

  const screenLargerThanMd = useScreenLargerThan('md');

  const [burgerMenuOpen, { toggle: toggleBurgerMenu, close: closeBurgerMenu }] =
    useDisclosure(false);

  const navigationLinks = (
    <>
      <NavLink
        icon={
          <ThemeIcon size="md" variant="light" color="red">
            <IconHome size="1rem" />
          </ThemeIcon>
        }
        label="Home"
        component={Link}
        href="/manage/"
      />
      <NavLink
        label="Boards"
        icon={
          <ThemeIcon size="md" variant="light" color="red">
            <IconLayoutDashboard size="1rem" />
          </ThemeIcon>
        }
        component={Link}
        href="/manage/boards"
      />
      <NavLink
        label="Users"
        icon={
          <ThemeIcon size="md" variant="light" color="red">
            <IconUser size="1rem" />
          </ThemeIcon>
        }
      >
        <NavLink
          icon={<IconUsers size="1rem" />}
          label="Manage"
          component={Link}
          href="/manage/users"
        />
        <NavLink
          icon={<IconMailForward size="1rem" />}
          label="Invites"
          component={Link}
          href="/manage/users/invites"
        />
      </NavLink>
      <NavLink
        label="Settings"
        icon={
          <ThemeIcon size="md" variant="light" color="red">
            <IconSettings2 size="1rem" />
          </ThemeIcon>
        }
        component={Link}
        href="/manage/settings"
      />
      <NavLink
        label="Help"
        icon={
          <ThemeIcon size="md" variant="light" color="red">
            <IconQuestionMark size="1rem" />
          </ThemeIcon>
        }
      >
        <NavLink
          icon={<IconBook2 size="1rem" />}
          component="a"
          href="https://homarr.dev/docs/about"
          label="Documentation"
        />
        <NavLink
          icon={<IconBrandGithub size="1rem" />}
          component="a"
          href="https://github.com/ajnart/homarr/issues/new/choose"
          label="Report an issue / bug"
        />
        <NavLink
          icon={<IconBrandDiscord size="1rem" />}
          component="a"
          href="https://discord.com/invite/aCsmEV5RgA"
          label="Community Discord"
        />
        <NavLink
          icon={<IconGitFork size="1rem" />}
          component="a"
          href="https://github.com/ajnart/homarr"
          label="Contribute"
        />
      </NavLink>
    </>
  );

  const burgerMenu = screenLargerThanMd ? undefined : (
    <Burger opened={burgerMenuOpen} onClick={toggleBurgerMenu} />
  );

  return (
    <>
      <AppShell
        styles={{
          root: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
          },
        }}
        navbar={
          <Navbar width={{ base: !screenLargerThanMd ? 0 : 220 }} hidden={!screenLargerThanMd}>
            <Navbar.Section pt="xs" grow>
              {navigationLinks}
            </Navbar.Section>
          </Navbar>
        }
        header={<MainHeader showExperimental logoHref="/manage" leftIcon={burgerMenu} />}
        footer={
          <Footer height={25}>
            <Group position="apart" px="md">
              <Flex gap="md" align="center" columnGap={5}>
                <Image src="/imgs/logo/logo.svg" width={20} height={20} alt="" />
                <Text fw="bold" size={15}>
                  Homarr
                </Text>
                {attributes.packageVersion && (
                  <Text color="dimmed" size={13}>
                    {attributes.packageVersion}
                  </Text>
                )}
              </Flex>
            </Group>
          </Footer>
        }
      >
        <Paper p="xl" mih="100%" withBorder>
          {children}
        </Paper>
      </AppShell>
      <Drawer opened={burgerMenuOpen} onClose={closeBurgerMenu}>
        {navigationLinks}
      </Drawer>
    </>
  );
};