<template>
  <div
    :class="[
      'uploader',
      `uploader--${id}`,
      { 'is-loading': isLoading },
      { 'is-active': previewSrc }
    ]"
  >
    <input class="uploader__input" type="file" ref="input" />
    <div class="uploader__preview" ref="preview" @click="edit">
      <Transition name="fade">
        <img v-if="previewSrc" :src="previewSrc" />
      </Transition>
      <Transition name="fade">
        <div class="uploader__spinner" v-if="isLoading"></div>
      </Transition>
    </div>
    <div class="uploader__actions">
      <AdminAction icon="edit" @click="edit" :disabled="isLoading" />
      <AdminAction
        icon="remove"
        @click="remove(previewSrc)"
        :disabled="isLoading"
        v-if="previewSrc"
      />
    </div>
  </div>
</template>

<script>
import { useUploader } from '@/use/components/uploader'

import AdminAction from '@/components/admin/ui/AdminAction'

export default {
  name: 'AdminUploader',
  components: { AdminAction },
  emits: ['uploaded', 'removed'],
  props: {
    id: {
      type: String,
      required: true
    },
    thumb: String,
    silent: Boolean,
    multiple: Boolean,
    accept: {
      type: Array,
      default: () => ['.jpg', '.jpeg']
    },
    maxSize: {
      type: Number,
      default: 0.5
    }
  },
  setup(props, context) {
    return {
      ...useUploader(props, context)
    }
  }
}
</script>

<style lang="scss">
.uploader {
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  @include shadow();
  border-radius: 12px;
  margin-top: 42px;
  @include transition(opacity);

  &.is-active,
  &.is-loading {
    .uploader__preview {
      &:before {
        opacity: 0;
      }
    }
  }

  &__input {
    display: none;
  }

  &__preview {
    @include img-filler() {
      width: 70%;
      height: 70%;
      left: 15%;
      right: 15%;
      top: 50%;
      transform: translateY(-50%);
    }

    position: relative;
    width: 100%;
    padding-bottom: 100%;
    background-color: $gray-200;
    cursor: pointer;

    @include icomoon(image) {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: 56px;
      color: black;
      opacity: 0.1;
      @include transition(opacity);
    }
  }

  &__actions {
    position: absolute;
    top: 15px;
    right: 15px;
    width: auto;
    display: flex;
    justify-content: center;
    background: white;
    padding: 3px 16px;
    border-radius: 6px;
  }

  &__progress {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40%;
    height: 3px;
    background-color: $orange;
  }

  &__spinner {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    border: 3px solid $gray-300;
    border-radius: 50%;
    border-top-color: $blue;
    transform: translate(-50%, -50%);
    animation: uploader-spin 1s ease-in-out infinite;
  }
}

@keyframes uploader-spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
