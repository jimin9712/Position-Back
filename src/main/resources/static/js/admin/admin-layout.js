// 회원 관리
// 모든 목록 컨테이너를 가져옴
const listContainers = document.querySelectorAll(".UserTable_container");
const paginationLists = document.querySelectorAll(".pagination-list");
// 일반 회원 목록과 기업 회원 목록을 구분
const MemberListLayout = listContainers[0]; // 첫 번째 컨테이너가 일반 회원 목록
const CorporationListLayout = listContainers[1]; // 두 번째 컨테이너가 기업 회원 목록
const MemberListPaging = paginationLists[0]; // 첫 번째 페이지네이션이 일반 회원 목록의 페이지네이션
const CorporationListPaging = paginationLists[1]; // 두 번째 페이지네이션이 기업 회원 목록의 페이지네이션
const keywordInput = document.querySelector(".Filter_searchInput"); // 검색어 입력 필드
const sortOptions = document.querySelectorAll(".sort-filter-option"); // 정렬 옵션
let selectedSort = "가입일 순"; // 기본 정렬 설정

// 검색어 초기화
keywordInput.value = new URLSearchParams(window.location.search).get("keyword") || "";

// 정렬 옵션 이벤트 설정
sortOptions.forEach((option) => {
    option.addEventListener("click", () => {
        // 선택한 옵션의 data-type 속성을 가져와서 selectedSort에 저장
        selectedSort = option.getAttribute("data-type");

        // 기존 선택 해제하고 새로운 선택 항목에 selected 클래스 추가
        sortOptions.forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");

        // 검색어와 정렬 기준을 사용하여 멤버 목록 새로고침
        fetchAndShowMembers(1);
    });
});

// 검색어 입력 시 검색 실행
keywordInput.addEventListener("input", () => {
    fetchAndShowMembers(1);
});

// 페이지 이동 함수 - fetchAndShowMembers 호출
function goToPage(page) {
    fetchAndShowMembers(page);
}


// 일반 회원 목록을 서버에서 가져오고 화면에 표시하는 함수
const fetchAndShowMembers = async (page) => {
    const keyword = keywordInput.value;
    const sortType = selectedSort;

    try {
        // 데이터를 서버에서 가져오는 요청
        const response = await fetch(`/admin/position/members/${page}?keyword=${keyword}&types=${sortType}`);
        const data = await response.json();

        // 페이지 데이터와 멤버 데이터를 표시하는 함수 호출
        data.pagination.currentPage = page;
        showMemberList(data);
    } catch (error) {
        console.error(`페이지 ${page} 로딩 중 오류 발생:`, error);
    }
};

// 일반 회원 목록과 페이지네이션을 표시하는 함수
const showMemberList = ( { members, pagination } ) => {
    let text = `
        <div class="UserTable_row UserTable_header">
            <div class="UserTable_cell"><input type="checkbox" class="selectAllCheckbox"/></div>
            <div class="UserTable_cell">이름</div>
            <div class="UserTable_cell">가입일</div>
            <div class="UserTable_cell">이메일</div>
            <div class="UserTable_cell">주소</div>
            <div class="UserTable_cell">전화번호</div>
            <div class="UserTable_cell">상태</div>
            <div class="UserTable_cell">Action</div>
        </div>
    `;

    members.forEach((member) => {
        text += `
            <div class="UserTable_row">
                <div class="UserTable_cell"><input type="checkbox" class="userCheckbox"/></div>
                <div class="UserTable_cell">${member.memberName || ''}</div>
                <div class="UserTable_cell">${member.createdDate || ''}</div>
                <div class="UserTable_cell">${member.memberEmail || ''}</div>
                <div class="UserTable_cell">${member.memberAddress || ''}</div>
                <div class="UserTable_cell">${member.memberPhone || ''}</div>
                <div class="UserTable_cell">${member.memberStatus || ''}</div>
                <div class="UserTable_cell"><button class="editBtn">수정</button></div>
            </div>    
        `;
    });

    MemberListLayout.innerHTML = text;

    console.log("Total pages:", pagination.totalPages);

    // 페이지 버튼 생성
    let pagingText = '';

    // 처음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-first ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-first-link" onclick="goToPage(1)" rel="nofollow">
                <span class="pagination-first-icon" aria-hidden="true">«</span>
            </a>
        </li>
    `;

    // 이전 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-prev ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-prev-link" onclick="goToPage(${pagination.currentPage - 1})" rel="prev nofollow">
                <span class="pagination-prev-icon" aria-hidden="true">‹</span>
            </a>
        </li>
    `;

    // 페이지 번호 버튼
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        pagingText += `
            <li class="pagination-page ${i === pagination.currentPage ? 'active' : ''}">
                <a href="#" class="pagination-page-link" onclick="goToPage(${i})">${i}</a>
            </li>
        `;
    }

    // 다음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-next ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-next-link" onclick="goToPage(${pagination.currentPage + 1})" rel="next nofollow">
                <span class="pagination-next-icon" aria-hidden="true">›</span>
            </a>
        </li>
    `;

    // 마지막 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-last ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-last-link" onclick="goToPage(${pagination.realEnd})" rel="nofollow">
                <span class="pagination-last-icon" aria-hidden="true">»</span>
            </a>
        </li>
    `;

    // 페이지네이션을 동적으로 추가
    MemberListPaging.innerHTML = pagingText;
};

// 기업 회원 부분
// 검색어 입력 시 검색 실행
keywordInput.addEventListener("input", () => {
    fetchAndShowCorporations(1);
});

// 페이지 이동 함수 - fetchAndShowMembers 호출
function goToPage(page) {
    fetchAndShowCorporations(page);
}

// 기업 회원 목록을 서버에서 가져오고 화면에 표시하는 함수
const fetchAndShowCorporations = async (page) => {
    const keyword = keywordInput.value;
    console.log("검색어:", keyword); // 검색어가 제대로 입력되는지 확인
    try {
        // 데이터를 서버에서 가져오는 요청
        const response = await fetch(`/admin/position/corporation-members/${page}?keyword=${keyword}`);
        const data = await response.json();

        // 페이지 데이터와 멤버 데이터를 표시하는 함수 호출
        data.pagination.currentPage = page;
        showCorporationList(data);
    } catch (error) {
        console.error(`페이지 ${page} 로딩 중 오류 발생:`, error);
    }
};

// 기업 회원 목록과 페이지네이션을 표시하는 함수
const showCorporationList = ( { corporations, pagination } ) => {
    let text = `
        <div class="UserTable_row UserTable_header">
            <div class="UserTable_cell"><input type="checkbox" id="selectAll"/></div>
            <div class="UserTable_cell">이름</div>
            <div class="UserTable_cell">가입일</div>
            <div class="UserTable_cell">이메일</div>
            <div class="UserTable_cell">주소</div>
            <div class="UserTable_cell">대표번호</div>
            <div class="UserTable_cell">사업자번호</div>
            <div class="UserTable_cell">Action</div>
        </div>
    `;

    corporations.forEach((corporation) => {
        text += `
            <div class="UserTable_row">
                <div class="UserTable_cell"><input type="checkbox" class="userCheckbox"/></div>
                <div class="UserTable_cell">${corporation.corporationName || ''}</div>
                <div class="UserTable_cell">${corporation.createdDate || ''}</div>
                <div class="UserTable_cell">${corporation.corporationEmail || ''}</div>
                <div class="UserTable_cell">${corporation.corporationAddress || ''}</div>
                <div class="UserTable_cell">${corporation.corporationGen || ''}</div>
                <div class="UserTable_cell">${corporation.corporationCode || ''}</div>
                <div class="UserTable_cell"><button class="editBtn">수정</button></div>
            </div>    
        `;
    });

    CorporationListLayout.innerHTML = text;

    console.log("Total pages:", pagination.totalPages);

    // 페이지 버튼 생성
    let pagingText = '';

    // 처음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-first ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-first-link" onclick="goToPage(1)" rel="nofollow">
                <span class="pagination-first-icon" aria-hidden="true">«</span>
            </a>
        </li>
    `;

    // 이전 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-prev ${pagination.currentPage === 1 ? 'disabled' : ''}">
            <a href="#" class="pagination-prev-link" onclick="goToPage(${pagination.currentPage - 1})" rel="prev nofollow">
                <span class="pagination-prev-icon" aria-hidden="true">‹</span>
            </a>
        </li>
    `;

    // 페이지 번호 버튼
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        pagingText += `
            <li class="pagination-page ${i === pagination.currentPage ? 'active' : ''}">
                <a href="#" class="pagination-page-link" onclick="goToPage(${i})">${i}</a>
            </li>
        `;
    }

    // 다음 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-next ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-next-link" onclick="goToPage(${pagination.currentPage + 1})" rel="next nofollow">
                <span class="pagination-next-icon" aria-hidden="true">›</span>
            </a>
        </li>
    `;

    // 마지막 페이지로 이동하는 버튼
    pagingText += `
        <li class="pagination-last ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}">
            <a href="#" class="pagination-last-link" onclick="goToPage(${pagination.realEnd})" rel="nofollow">
                <span class="pagination-last-icon" aria-hidden="true">»</span>
            </a>
        </li>
    `;

    // 페이지네이션을 동적으로 추가
    CorporationListPaging.innerHTML = pagingText;
};

//





