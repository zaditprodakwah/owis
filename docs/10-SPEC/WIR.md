# **WORKSPACE INTELLIGENCE REPORT SPECIFICATION (WIR)**

**Status:** Canonical  
**Version:** 1.0.0-draft  
**Layer:** Core Specification  
**Audience:** AI IDE Agents, Runtime Implementers, Specification Authors, OSS Maintainers

---

# **1. Objective**

The Workspace Intelligence Report (WIR) defines the canonical project intelligence model that an AI IDE Agent MUST generate after completing workspace ingestion and before executing any implementation tasks.

WIR is a machine-oriented artifact. It is designed to represent the agent's validated understanding of the current workspace deterministically, without narrative padding, explanations, or conversational filler.

---

# **2. Generation Conditions**

Generate a WIR only after completing:
* Workspace recursive discovery.
* Ingestion and parsing.
* Source-of-Truth hierarchy mapping.
* Knowledge normalization.
* Entity and workflow correlation.
* Dependency mapping.
* Conflict and gap auditing.

If any blocking conflicts exist, set `execution_readiness: BLOCKED` and halt execution.

---

# **3. Output Format**

The WIR must be generated as raw, structured YAML or JSON following the canonical schema.
* No markdown explanations.
* No conversational text or summaries.
* No conversational responses.

---

# **4. Canonical Schema**

```yaml
workspace:
  root: String
  scanned_files: Integer
  scanned_directories: Integer
  ignored_paths: [String]
  supported_formats: [String]
  generated_at: String (ISO 8601)

project:
  name: String
  description: String
  version: String
  maturity: String
  repository_type: String
  domain: String
  objectives: [String]
  stakeholders: [String]

source_of_truth:
  primary: [String]
  secondary: [String]
  reference: [String]
  temporary: [String]

knowledge:
  glossary: Map<String, String>
  terminology: Map<String, String>
  concepts: [String]
  business_rules: [String]
  assumptions: [String]

architecture:
  style: String
  patterns: [String]
  bounded_contexts: [String]
  modules: [ModuleObject]
  services: [String]
  packages: [String]
  layers: [String]
  workflows: [WorkflowObject]

technology:
  languages: [String]
  frameworks: [String]
  runtimes: [String]
  libraries: [String]
  package_managers: [String]
  databases: [String]
  storage: [String]
  messaging: [String]
  cache: [String]
  deployment: [String]
  infrastructure: [String]

contracts:
  api: [ContractObject]
  schema: [ContractObject]
  interfaces: [ContractObject]
  events: [ContractObject]
  public: [ContractObject]
  internal: [ContractObject]

domain:
  entities: [String]
  aggregates: [String]
  value_objects: [String]
  repositories: [String]
  services: [String]
  policies: [String]

dependencies:
  internal: [DependencyObject]
  external: [DependencyObject]
  module_graph: [DependencyObject]
  integration_points: [DependencyObject]

security:
  authentication: String
  authorization: String
  secrets: [String]
  encryption: [String]
  compliance: [String]

constraints:
  architecture: [String]
  technical: [String]
  business: [String]
  infrastructure: [String]
  performance: [String]
  security: [String]

quality:
  coding_standard: String
  testing_strategy: String
  documentation_standard: String
  observability: String

implementation:
  active_scope: [String]
  excluded_scope: [String]
  completed_features: [String]
  pending_features: [String]
  technical_debt: [String]

conflicts:
  blocking: [ConflictObject]
  non_blocking: [ConflictObject]
  duplicate_definitions: [ConflictObject]
  inconsistent_terms: [ConflictObject]
  unresolved: [ConflictObject]

knowledge_gaps:
  missing_documents: [KnowledgeGapObject]
  missing_contracts: [KnowledgeGapObject]
  missing_requirements: [KnowledgeGapObject]
  unresolved_decisions: [KnowledgeGapObject]

confidence:
  workspace: Float (0.0 to 1.0)
  architecture: Float (0.0 to 1.0)
  contracts: Float (0.0 to 1.0)
  implementation: Float (0.0 to 1.0)
  documentation: Float (0.0 to 1.0)
  overall: Float (0.0 to 1.0)

execution:
  readiness: String (READY | PARTIAL | BLOCKED)
  blockers: [String]
  recommended_scope: [String]
  validation_required: [String]
  next_action: String
```

---

# **5. Confidence Scale**

| Value | Definition |
| ----- | ---------- |
| **1.00** | Fully verified by canonical artifacts |
| **0.90** | Verified by multiple primary sources |
| **0.75** | Supported by strong documentation |
| **0.50** | Supported by partial evidence or code inference |
| **0.25** | Weak evidence; relies on speculative assumptions |
| **0.00** | Unknown; no files found |

---

# **6. Execution Readiness**

* **READY**: Active scope is fully mapped, there are zero blocking conflicts, and sufficient context is loaded.
* **PARTIAL**: Workspace is understood but some non-blocking uncertainties exist.
* **BLOCKED**: One or more blocking conflicts or gaps exist. Implementation must not proceed.

---

# **7. Blocking Conditions**

Set `execution: readiness: BLOCKED` when any of the following exist:
* Conflicting or ambiguous Source-of-Truth.
* Contradictory architectural specifications.
* Incompatible interface or schema contracts.
* Ambiguous public API signatures.
* Missing critical dependencies.
* Unresolved database migrations or models.
* Unresolved security models.

---

# **8. Normalization Rules**

All extracted data must be normalized to eliminate:
* Duplicate terminology (consolidate and map to a single glossary key).
* Overlapping contracts (merge definitions).
* Duplicate entities or workflows (link to a single canonical object).

---

# **9. Reference Objects**

### **Conflict Object**
```yaml
id: String
severity: String (BLOCKING | WARN | INFO)
category: String
sources: [String]
description: String
impact: String
required_resolution: String
status: String (OPEN | RESOLVED)
```

### **Knowledge Gap Object**
```yaml
category: String
description: String
affected_scope: [String]
required_information: String
blocking: Boolean
```

### **Dependency Object**
```yaml
source: String
target: String
relationship: String
criticality: String (HIGH | MEDIUM | LOW)
```

### **Module Object**
```yaml
name: String
purpose: String
owner: String
dependencies: [String]
contracts: [String]
status: String
```

### **Contract Object**
```yaml
name: String
type: String (API | SCHEMA | INTERFACE)
version: String
owner: String
visibility: String (PUBLIC | INTERNAL)
status: String
```

### **Workflow Object**
```yaml
name: String
trigger: String
steps: [String]
outputs: [String]
dependencies: [String]
```

---

# **10. Invalid Output**

The following must NEVER appear in a WIR:
* Interactive dialog, greetings, or conversational remarks.
* Subjective assessments, opinions, or advice.
* Proposed code patches or git diffs.
* Speculative definitions not found in workspace documentation.

---

# **11. Success Criteria**

A valid WIR must fully represent the workspace, detail the source-of-truth, list all dependencies, capture constraints, and declare execution readiness. No additional interpretation should be needed to start the task.
