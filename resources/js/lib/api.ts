type ApiResponse<T> = {
  data: T;
  error?: string;
  familyId?: number;
  message?: string;
  code: number;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(
    path,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '',
        "X-Requested-With": "XMLHttpRequest"
      },
      cache: "no-cache"
    }
  );

  if (! response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

type Family = {
  familyName: string;
  familySize: number;
  token: string;
  familyId: number;
}

type FamilyInformation = {
  firstName: string;
    middleName: string;
    lastName: string;
    hasPartner: boolean;
    age: string;
    familyTitle: string;
    partnerFirstName: string;
    partnerMiddleName: string;
    partnerLastName: string;
    partnerAge: string;
    partnerFamilyTitle: string;
    partnerNeedsUser?: boolean;
    partnerUserEmail?: string | null;
}

type Child = {
  firstName: string;
  middleName: string;
  lastName: string;
  age: string;
  needsUserLogin: boolean;
  userEmail?: string | null;
}

type ChildResponse = {
  children: Child[];
  familyId: number;
}

type CreateFamilyParentsRequest = {
  familyId: number;
  mainParent: Omit<FamilyInformation, 'partnerFirstName' | 'partnerMiddleName' | 'partnerLastName' | 'partnerAge' | 'partnerFamilyTitle' | 'partnerNeedsUser' | 'partnerUserEmail'>;
  partner?: Pick<FamilyInformation, 'partnerFirstName' | 'partnerMiddleName' | 'partnerLastName' | 'partnerAge' | 'partnerFamilyTitle' | 'partnerNeedsUser' | 'partnerUserEmail'>;
}

type CompleteOnboardingProcessResponse = {
  familyId: number;
}

export const createFamily = async (familyData: Record<string, any>): Promise<ApiResponse<Family>> => {
  return request<ApiResponse<Family>>('/api/onboarding/family/create', {
    method: 'POST',
    body: JSON.stringify(familyData)
  });
}

export const createFamilyParents = async (requestData: CreateFamilyParentsRequest): Promise<ApiResponse<CreateFamilyParentsRequest>> => {
  return request<ApiResponse<CreateFamilyParentsRequest>>('/api/onboarding/family/create/parents', {
    method: 'POST',
    body: JSON.stringify(requestData)
  });
}

export const createFamilyChildren = async (requestData: { familyId: number; children: Child[] }): Promise<ApiResponse<ChildResponse>> => {
  return request<ApiResponse<ChildResponse>>('/api/onboarding/family/create/children', {
    method: 'POST',
    body: JSON.stringify(requestData)
  });
}

export const sendCompleteOnboardingProcess = async (requestData: {familyId: number}): Promise<ApiResponse<CompleteOnboardingProcessResponse>> => {
  return request<ApiResponse<CompleteOnboardingProcessResponse>>('/api/onboarding/process/complete', {
    method: 'POST',
    body: JSON.stringify(requestData)
  });
}