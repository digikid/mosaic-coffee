<template>
  <div class="sidebar__user user" v-if="user">
    <div class="user__aside">
      <AdminThumb :src="user.thumbUrl || user.thumb" :title="user.name" />
    </div>
    <div class="user__main">
      <div class="user__name">{{ user.name }}</div>
      <div class="user__email">{{ user.email }}</div>
      <div class="user__logout">
        <a href="#" @click.prevent="logout">
          <i class="icon icon--logout"></i> Выйти
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { useUsers } from '@/use/store/users'
import { useAuth } from '@/use/store/auth'

import AdminThumb from '@/components/admin/ui/AdminThumb'

export default {
  name: 'AdminUser',
  components: { AdminThumb },
  setup() {
    const { current: user } = useUsers()
    const { logout } = useAuth()

    return {
      user,
      logout
    }
  }
}
</script>

<style lang="scss">
.user {
  text-align: center;
  background-color: $primary;
  border-radius: $radius;
  padding: 12px;
  margin-bottom: 18px;

  a {
    color: $white;
  }

  &__name {
    font-weight: bold;
  }

  &__email {
    font-size: 12px;
    opacity: 0.4;
  }

  &__logout {
    font-size: 14px;
    margin-top: 7px;

    i {
      position: relative;
      top: 2px;
      margin-right: 3px;
    }
  }

  .admin__thumb {
    @include icomoon(user) {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 24px;
      color: $black;
      opacity: 0.1;
    }
  }
}
</style>
