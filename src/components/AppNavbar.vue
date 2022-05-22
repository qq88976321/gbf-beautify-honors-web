<template>
  <b-navbar variant="primary" type="dark">
    <b-navbar-brand tag="h1" class="mb-0">{{ title }}</b-navbar-brand>
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-navbar-brand
        href="https://github.com/qq88976321/gbf-beautify-honors-web"
      >
        <b-icon icon="github"></b-icon>
      </b-navbar-brand>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>
