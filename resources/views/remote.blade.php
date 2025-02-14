@extends('base')

@section('title', 'Sparkle - Remote Controller')

@push('scripts')
    @vite(['resources/assets/js/remote/app.ts'])
@endpush
