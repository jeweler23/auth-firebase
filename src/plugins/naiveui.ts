import {
  create,
  NButton,
  NDialogProvider,
  NInput,
  NLoadingBarProvider,
  NMessageProvider,
  NModal,
  NNotificationProvider,
} from 'naive-ui';

export const naive = create({
  components: [
    NMessageProvider,
    NNotificationProvider,
    NDialogProvider,
    NLoadingBarProvider,
    NButton,
    NInput,
    NModal,
  ],
});
