package com.app.positionback.repository.inquiry;

import com.app.positionback.domain.inquiry.InquiryVO;
import com.app.positionback.mapper.inquiry.InquiryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class InquiryDAO {
    private final InquiryMapper inquiryMapper;

    // 1:1 문의 작성
    public void saveInquiry(InquiryVO inquiryVO) {
        inquiryMapper.insertInquiry(inquiryVO);
    }

    // 가장 최근 문의 ID 가져오기
    public Long getRecentInsertedId() {
        return inquiryMapper.getRecentInsertId();
    }
}
