<template>
  <div
    class="flex w-auto items-center rounded-full bg-amber-400/10 px-3 py-1 text-xs font-medium leading-5 text-amber-600 transition duration-300 hover:bg-amber-400/20 dark:text-amber-400"
  >
    <strong class="line-clamp-1 font-semibold">
      <slot>
        <span class="hidden xl:flex">
          ✨ Recently added
          <span class="mx-1.5">·</span>
          Copy Module
        </span>
        <span class="hidden lg:block xl:hidden"> ✨ Latest Issue </span>
      </slot>
    </strong>
    <svg
      width="3"
      height="6"
      class="ml-3 overflow-visible text-amber-300 dark:text-amber-400"
      aria-hidden="true"
    >
      <path
        d="M0 0L3 3L0 6"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  </div>
</template>
