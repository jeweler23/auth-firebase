import {
  create,
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider,
  NLoadingBarProvider,
  NButton,
  NInput,
  NModal
} from 'naive-ui'

export const naive = create({
  components: [
    NMessageProvider,
    NNotificationProvider,
    NDialogProvider,
    NLoadingBarProvider,
    NButton,
    NInput,
    NModal
  ]
})
