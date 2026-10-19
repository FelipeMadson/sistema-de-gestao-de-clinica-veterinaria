# Sistema de Gestão de Clínica Veterinária

[![CI](https://github.com/FelipeMadson/sistema-de-gestao-de-clinica-veterinaria/actions/workflows/ci.yml/badge.svg)](https://github.com/FelipeMadson/sistema-de-gestao-de-clinica-veterinaria/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Release](https://img.shields.io/badge/release-v1.0.0-green.svg)](https://github.com/FelipeMadson/sistema-de-gestao-de-clinica-veterinaria/releases)

Enterprise-grade core domain engine for veterinary hospitals and clinics. Manages electronic health records (EHR), multi-species pet registration, veterinarian scheduling with conflict detection, and automated immunization tracking.

## Architecture

- **Domain-Driven Design (DDD)**: Clear boundaries between Patients (Pets), Guardians (Tutors), and Care Providers (Veterinarians).
- **Scheduling Guard**: Strict algorithmic prevention of temporal overlaps for both doctors and patients.
- **Immunization Watchdog**: Real-time evaluation of vaccine expiration dates against current system time.
- **Zero External Dependencies**: Pure TypeScript core with native Node.js test runner for minimal footprint and maximum auditability.

## Installation & Testing

```bash
npm install
npm run build
npm test
```

## Author

Developed by **[Felipe Madison](https://github.com/FelipeMadson)**.
