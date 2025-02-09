import type { Meta, StoryObj } from '@storybook/react';
import type { TInjectedMenu } from '@/@types/components/menu';

import { Menu } from '.';
import componentManifest from '../../..';

const { definition } = componentManifest.menu;

// -------------------------------------------------------------------------------------------------

export default {
  title: 'Components/Menu',
  component: Menu,
  decorators: [
    (Story) => (
      <div id="stories-menu-wrapper">
        <div id="menu" className="stories-menu">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  loaders: [
    async () => {
      const { importStrings, getStrings } = await import('@/core/i18n');
      await importStrings('es');

      const { importAssets, getAssets } = await import('@/core/assets');
      const assetManifest = (await import('@/assets')).default;
      await importAssets(
        Object.entries(assetManifest).map(([identifier, manifest]) => ({ identifier, manifest })),
        () => undefined,
      );

      return {
        i18n: getStrings(Object.keys(definition.strings)),
        assets: getAssets(definition.assets!),
      };
    },
  ],
  render: (args, { loaded: { i18n, assets } }) => (
    <Menu
      {...args}
      {...{
        injected: {
          flags: args.injected.flags,
          i18n,
          assets,
        },
      }}
    />
  ),
} as Meta<typeof Menu>;

type Story = StoryObj<typeof Menu>;

// -------------------------------------------------------------------------------------------------

const injected: TInjectedMenu = {
  flags: {
    uploadFile: false,
    recording: false,
    exportDrawing: false,
    loadProject: false,
    saveProject: false,
  },
  // @ts-ignore
  i18n: {},
  // @ts-ignore
  assets: {},
};

// == state - not running ==================================

export const StateNotRunning: Story = {
  args: {
    states: { running: false },
    injected,
  },
  name: 'State - Not Running',
};

// == state - running ======================================

export const StateRunning: Story = {
  args: {
    states: { running: true },
    injected,
  },
  name: 'State - Running',
};

// == flags - upload file ==================================

export const FlagsUploadFile: Story = {
  args: {
    states: { running: false },
    injected: {
      flags: {
        ...injected.flags,
        uploadFile: true,
      },
      i18n: { ...injected.i18n },
      assets: { ...injected.assets },
    },
  },
  name: 'Flags - Upload File',
};

// == flags - recording ====================================

export const FlagsRecording: Story = {
  args: {
    states: { running: false },
    injected: {
      flags: {
        ...injected.flags,
        recording: true,
      },
      i18n: { ...injected.i18n },
      assets: { ...injected.assets },
    },
  },
  name: 'Flags - Recording',
};

// == flags - export drawing ===============================

export const FlagsExportDrawing: Story = {
  args: {
    states: { running: false },
    injected: {
      flags: {
        ...injected.flags,
        exportDrawing: true,
      },
      i18n: { ...injected.i18n },
      assets: { ...injected.assets },
    },
  },
  name: 'Flags - Export Drawing',
};

// == flags - load project =================================

export const FlagsLoadProject: Story = {
  args: {
    states: { running: false },
    injected: {
      flags: {
        ...injected.flags,
        loadProject: true,
      },
      i18n: { ...injected.i18n },
      assets: { ...injected.assets },
    },
  },
  name: 'Flags - Load Project',
};

// == flags - save project =================================

export const FlagsSaveProject: Story = {
  args: {
    states: { running: false },
    injected: {
      flags: {
        ...injected.flags,
        saveProject: true,
      },
      i18n: { ...injected.i18n },
      assets: { ...injected.assets },
    },
  },
  name: 'Flags - Save Project',
};

// == flags - all ==========================================

export const FlagsAll: Story = {
  args: {
    states: { running: false },
    injected: {
      flags: {
        uploadFile: true,
        recording: true,
        exportDrawing: true,
        loadProject: true,
        saveProject: true,
      },
      i18n: { ...injected.i18n },
      assets: { ...injected.assets },
    },
  },
  name: 'Flags - All',
};
