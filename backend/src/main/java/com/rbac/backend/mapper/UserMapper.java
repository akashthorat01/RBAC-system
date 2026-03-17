package com.rbac.backend.mapper;

import com.rbac.backend.dto.UserDto;
import com.rbac.backend.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(User user);
}
